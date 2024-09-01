import { GetCourseMembersResponse } from "@/app/page";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import UsedByList from "./used-by-list";

interface FlashcardsProps {
  members: GetCourseMembersResponse;
  cid: string;
  sid: string;
}

function shuffle(arr: any[]) {
  for (let i = arr.length-1; i > 0; --i) {
    let j = Math.random()*(i+1) | 0;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export default function Flashcards({members, cid, sid}: FlashcardsProps) {
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [order, setOrder] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  function resetGame() {
    let newOrder = [];
    for (let mid in members) {
      newOrder.push(mid);
    }
    shuffle(newOrder);
    setIndex(0);
    setCompleted(0);
    setOrder(newOrder);
  }

  useEffect(() => {
    resetGame();
  }, [cid])

  useEffect(() => {
    if (completed && completed == Object.keys(members).length) {
      fetch(
        `http://localhost/flashcards/complete_course?sid=${encodeURIComponent(sid)}&cid=${encodeURIComponent(cid)}`,
        { method: 'POST' },
      )
    }
  })

  return completed < Object.keys(members).length ? (
    <div className='mt-6 p-4 border border-slate-800 rounded-md space-y-4'>
      <Card className='max-w-xs mx-auto cursor-pointer' onClick={() => setRevealed(!revealed)}>
        <CardHeader>
          <CardTitle>{revealed ? members[order[index]]?.name : "???"}</CardTitle>
          <CardDescription>Click to reveal name</CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={members[order[index]]?.img}
            className='w-full'
          />
        </CardContent>
        <CardFooter>
          <p>{completed} / {Object.keys(members).length} cards</p>
        </CardFooter>
      </Card>
      
      <div className='w-full flex justify-around gap-4'>
        <Button onClick={() => setRevealed(true)} className={cn('flex-1', {'hidden': revealed})} variant='secondary'>
          Reveal name
        </Button>
        <Button variant='destructive' className={cn('flex-1', {'hidden': !revealed})} onClick={() => {
          if (index+1 == order.length) {
            shuffle(order);
            setOrder([...order]);
          }
          setRevealed(false);
          setIndex((index+1)%order.length);
        }}>
          Again
        </Button>
        <Button variant='constructive' className={cn('flex-1', {'hidden': !revealed})} onClick={() => {
          let newOrder = [];
          for (let i = 0; i < order.length; i++) {
            if (i == index) continue;
            newOrder.push(order[i]);
          }
          setRevealed(false);
          if (index == newOrder.length) {
            shuffle(newOrder);
            setIndex(0);
          }
          setOrder(newOrder);
          setCompleted(completed+1);
        }}>
          Good
        </Button>
      </div>
    </div>
  ) : (
    <div className='mt-6 p-4 border border-slate-800 rounded-md space-y-4'>
      <p>Flashcards complete! Congratulations! 🎉</p>
      {/* <h2 className='scroll-m-20 text-3xl font-bold tracking-tight leading-loose'>Leaderboard</h2> */}
      <h3 className='text-xl font-bold tracking-tight'>Leaderboard</h3>
      <UsedByList />
      <Button onClick={resetGame} className='w-full' variant='secondary'>
        Restart flashcards
      </Button>
    </div>
  )
}