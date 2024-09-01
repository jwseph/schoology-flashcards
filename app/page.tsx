'use client';

import SelectCourse from "@/components/course-select";
import Flashcards from "@/components/flashcards";
import SignInDialog from "@/components/sign-in-dialog";
import { Button } from "@/components/ui/button";
import UsedByList from "@/components/used-by-list";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Chatbox from "@/components/chatbox";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { linkStyle } from "@/lib/utils";
import Link from "next/link";

export interface CourseItem {
  cid: string;
  course_name: string;
}
interface CreateSessionResponse {
  sid: string;
  courses: CourseItem[];
}
async function createSession(school_id: string, password: string) {
  let res = null;
  try {
    const r = await fetch(
      `http://localhost/flashcards/create_session?school_id=${encodeURIComponent(school_id)}&password=${encodeURIComponent(password)}`,
      { method: 'POST' },
    )
    res = await r.json();
  } catch {
  }
  return res as CreateSessionResponse;
}

interface CourseMemberItem {
  img: string;
  name: string;
}
export interface GetCourseMembersResponse {
  [mid: string]: CourseMemberItem;
}
async function getCourseMembers(sid: string, cid: string | number) {
  const r = await fetch(
    `http://localhost/flashcards/get_course_members?sid=${encodeURIComponent(sid)}&cid=${encodeURIComponent(cid)}`
  )
  return (await r.json()) as GetCourseMembersResponse;
}

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const [sid, setSid] = useState('');
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [cid, setCid] = useState<string>();
  const [courseMembers, setCourseMembers] = useState<GetCourseMembersResponse>();
  const [anyCourseMembers, setAnyCourseMembers] = useState<GetCourseMembersResponse>();
  const { toast } = useToast();
  const [tab, setTab] = useState('flashcards');

  useEffect(() => {
    console.log(cid);
  }, [cid])

  return (
    <main className='dark px-4'>
      <div className='mx-auto max-w-5xl py-4 flex flex-col min-h-screen justify-between'>
        <Tabs defaultValue="flashcards" className="w-full" onValueChange={(tab) => setTab(tab)}>
          <div className='flex justify-between items-center flex-wrap gap-4'>
            <SelectCourse courses={courses} onSelectCourse={async (cid) => {
              console.log(cid);
              let data = await getCourseMembers(sid, cid);
              setAnyCourseMembers(data);
              let members: GetCourseMembersResponse = {};
              for (let mid in data) {
                if (data[mid].img.includes('.svg')) continue;
                members[mid] = data[mid];
              }
              console.log(members);
              setCid(cid);
              setCourseMembers(members);
            }}/>
            <TabsList className='grid w-fit grid-cols-3'>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>
          </div>
          <div key={cid+''}>
            <TabsContent value="flashcards" forceMount hidden={tab != 'flashcards'}>
              {courseMembers != null ? <>
                <h1 className='scroll-m-20 text-3xl font-bold tracking-tight leading-loose'>Class flashcards</h1>
                <p>{"Practice naming your classmates/teachers!"}</p>
                <Flashcards members={courseMembers} cid={cid as string} sid={sid} />
              </> : (
                <p>Select a course to continue.</p>
              )}
            
            </TabsContent>
            <TabsContent value="chat" forceMount hidden={tab != 'chat'}>
              {courseMembers != null ? <>
                <Chatbox members={courseMembers} cid={cid as string} sid={sid} key={'chatbox'+cid} />
              </> : (
                <p>Select a course to continue.</p>
              )}
            </TabsContent>
            <TabsContent value="members" forceMount hidden={tab != 'members'}>
              {courseMembers != null ? <>
                <h1 className='scroll-m-20 text-3xl font-bold tracking-tight leading-loose'>Class members</h1>
                {anyCourseMembers != null && <div className='flex flex-wrap gap-4' key={cid}>
                  {Object.values(anyCourseMembers).map(({name, img}) => (
                    <Popover key={img}>
                      <PopoverTrigger>
                        <img src={img} className='size-16 object-cover rounded-full'/>
                      </PopoverTrigger>
                      <PopoverContent className='w-fit flex flex-col items-center gap-2'>
                        <img src={img} className='w-32 object-cover rounded-sm'/>
                        {name}
                      </PopoverContent>
                    </Popover>
                  ))}
                </div>}
              </> : (
                <p>Select a course to continue.</p>
              )}
            </TabsContent>
          </div>
        </Tabs>

        <SignInDialog open={!signedIn} onClick={async (username, password) => {
          console.log(username);
          let data = await createSession(username, password);
          if (data == null) {
            console.log('wrong paassword')
            toast({
              variant: 'destructive',
              title: "Login failed",
              description: "Please check you entered the correct school ID (without email) and password",
            })
            return;
          }
          setSignedIn(true);
          setSid(data.sid);
          setCourses(data.courses);
          console.log(JSON.stringify(data.courses));
        }}/>

        <div className='pt-8 text-slate-400 text-sm flex gap-8 justify-between flex-wrap'>
          <div>
            Built by <a href='https://github.com/jwseph' target='_blank' className={linkStyle}>jwseph</a>.{' '}
            Source code on <a href='https://github.com/jwseph/schoology-flashcards' target='_blank' className={linkStyle}>GitHub</a>.{' '}
          </div>
          <div className='flex gap-4'>
            <a href='https://docs.google.com/forms/u/0/d/e/1FAIpQLSffcclnaQmDB9bNKITEtw4O3bmF_NOinL-Wu_0jIPvTHZLSvw/formResponse' target='_blank' className={linkStyle}>Feedback</a>
            <Link href='/privacy-policy' target='_blank' className={linkStyle}>Privacy policy</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
