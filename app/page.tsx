'use client';

import SelectCourse from "@/components/course-select";
import Flashcards from "@/components/flashcards";
import SignInDialog from "@/components/sign-in-dialog";
import { Button } from "@/components/ui/button";
import UsedByList from "@/components/used-by-list";
import { useState } from "react";

export interface CourseItem {
  cid: string;
  course_name: string;
}
interface CreateSessionResponse {
  sid: string;
  courses: CourseItem[];
}
async function createSession(school_id: string, password: string) {
  const r = await fetch(
    `https://schoology-flashcards.fly.dev/create_session?school_id=${encodeURIComponent(school_id)}&password=${encodeURIComponent(password)}`,
    { method: 'POST' },
  )
  return (await r.json()) as CreateSessionResponse;
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
    `https://schoology-flashcards.fly.dev/get_course_members?sid=${encodeURIComponent(sid)}&cid=${encodeURIComponent(cid)}`
  )
  return (await r.json()) as GetCourseMembersResponse;
}

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const [sid, setSid] = useState('');
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [cid, setCid] = useState<string>();
  const [courseMembers, setCourseMembers] = useState<GetCourseMembersResponse>();

  return (
    <main className='dark'>
      <h1 className='scroll-m-20 text-5xl font-bold tracking-tight leading-loose'>Name prep for school</h1>

      <h2 className='scroll-m-20 text-3xl font-bold tracking-tight leading-loose'>Leaderboard</h2>
      <UsedByList />

      <SignInDialog open={!signedIn} onClick={async (username, password) => {
        console.log(username);
        let data = await createSession(username, password);
        setSignedIn(true);
        setSid(data.sid);
        setCourses(data.courses);
        console.log(JSON.stringify(data.courses));
      }}/>

      <h1 className='scroll-m-20 text-3xl font-bold tracking-tight leading-loose'>Course</h1>
      <SelectCourse courses={courses} onSelectCourse={async (cid) => {
        console.log(cid);
        let data = await getCourseMembers(sid, cid);
        let members: GetCourseMembersResponse = {};
        for (let cid in data) {
          if (data[cid].img.includes('.svg')) continue;
          members[cid] = data[cid];
        }
        console.log(members);
        setCid(cid);
        setCourseMembers(members);
      }}/>

      {courseMembers != null && <>
        <h1 className='scroll-m-20 text-3xl font-bold tracking-tight leading-loose'>Do you know your class?</h1>
        <Flashcards members={courseMembers} cid={cid as string} sid={sid} />
        <h1 className='scroll-m-20 text-3xl font-bold tracking-tight leading-loose'>All class members (minus ones w/o photos)</h1>
        <div className='flex flex-wrap'>
          {Object.values(courseMembers).map(({name, img}) => (
            <img src={img} className='w-16 md:w-32' key={img}></img>
          ))}
        </div>
      </>}
    </main>
  );
}
