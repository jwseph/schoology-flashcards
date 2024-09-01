'use client';

import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { socket } from './lib/socket.js'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Cat, Send, SendHorizonal } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { GetCourseMembersResponse } from "@/app/page.jsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ChatboxProps {
  cid: string;
  sid: string;
  members: GetCourseMembersResponse;
}

interface MessageProps {
  text: string;
  photo_url: string;
  name: string;
}

interface MessagesType {
  [messageId: string]: MessageProps;
}

export default function Chatbox({cid, sid, members}: ChatboxProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [messageInputText, setMessageInputText] = useState('');
  const [messages, setMessages] = useState<MessagesType>({});
  const scrollRef = useRef<HTMLDivElement>();

  function subscribe() {
    if (!socket.connected) return;
    socket.emit('subscribe', { cid });
  }

  function unsubscribe() {
    if (!socket.connected) return;
    socket.emit('unsubscribe');
  }

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      subscribe();
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('receive_message', onReceiveMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('receive_message', onReceiveMessage);
    }
  }, [])

  useEffect(() => {
    socket.emit('read_history', {
      cid: cid,
    }, onReceiveMessage);
  }, [])

  function onReceiveMessage(data: MessagesType) {
    console.log('message received!')
    console.log(data);
    console.log('should be')
    console.log(JSON.stringify(messages))
    console.log(JSON.stringify(data))
    console.log(JSON.stringify({...messages, ...data}))
    console.log({...messages, ...data})
    setMessages((messages_) => ({...messages_, ...data}))
  }

  useEffect(() => {
    subscribe();
  }, [cid])

  useEffect(() => {
    console.log(messages)
    if (scrollRef.current != null) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages])

  return (
    <div className='w-full'>
      <div className='flex justify-between items-baseline'>
        <h1 className='scroll-m-20 text-3xl font-bold tracking-tight leading-loose'>Class chat</h1>
        <p>
          {isConnected ? 'connected' : 'disconnected'}
        </p>
      </div>
      <ScrollArea className="h-[32rem] w-full max-w-full rounded-md border border-slate-800" viewportRef={scrollRef as unknown as React.Ref<HTMLDivElement>} >
        {Object.keys(messages).map((messageId) => {
          const { text, photo_url, name } = messages[messageId];

          return (
            <div key={messageId} className='flex gap-2 w-full my-2'>
              <div className='size-8'>
                <Popover>
                  <PopoverTrigger className='size-8'>
                    <img src={photo_url} className='size-8 rounded-full' />
                  </PopoverTrigger>
                  <PopoverContent className='w-fit'>{name}</PopoverContent>
                </Popover>
              </div>
              <div>
                <p className='break-words leading-loose text-sm'>{text}</p>
              </div>
            </div>
          )
        })}
      </ScrollArea>
      <form className='flex gap-4 mt-4' onSubmit={(e) => {
        e.preventDefault();
        console.log('submit!');
        if (!messageInputText.length) return;
        socket.emit('send_message', {
          cid: cid,
          sid: sid,
          message: {
            text: messageInputText,
          },
        }, (res: boolean) => {
          console.log(res)
        });
        setMessageInputText('');
      }}>
        <Input
          type='text'
          value={messageInputText}
          onChange={(e) => setMessageInputText(e.target.value)}
          placeholder="Enter message"
          autoFocus
        />
        <Button size='icon' className='p-2' type='submit'>
          <SendHorizonal className='size-8' />
        </Button>
      </form>
    </div>
  )
}