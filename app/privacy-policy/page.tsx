import { cn, linkStyle } from "@/lib/utils";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className='dark p-8'>
      <div className='mx-auto max-w-5xl leading-loose'>
        <h1 className='scroll-m-20 text-3xl font-bold tracking-tight leading-loose'>Privacy policy</h1>
        <Link href='/' className={linkStyle}>Return home</Link>
        <h2 className='scroll-m-20 text-2xl font-bold tracking-tight leading-loose'>How Class Search handles your personal login information</h2>
        <ol className='list-decimal list-inside'>
          <li>You enter your Schoology login school ID and password. Both are sent to the server. If you are on https, this info is impossible to intercept.</li>
          <li>The server then uses your school ID and password to sign into Schoology, creating a Schoology session. The server saves the Schoology session but discards your school ID and password.</li>
          <li>The server fetches a list of your courses using the session.</li>
          <li>If you select a course, the server fetches the name and photo URL of all members in that course.</li>
        </ol>
        <h2 className='scroll-m-20 text-2xl font-bold tracking-tight leading-loose'>Removal of data</h2>
        <ul className='list-disc list-inside'>
          Please fill out{' '}
          <a className={linkStyle} href='https://docs.google.com/forms/u/0/d/e/1FAIpQLSffcclnaQmDB9bNKITEtw4O3bmF_NOinL-Wu_0jIPvTHZLSvw/formResponse' target='_blank'>
            this Google Form
          </a>
          {' '}to request removal of data such as:
          <li>your name on the flashcard leaderboard</li>
          <li>your chat messages</li>
        </ul>
        <h2 className='scroll-m-20 text-2xl font-bold tracking-tight leading-loose'>Feature requests</h2>
        <p>
          Have a really good idea for how to improve this website or want to upload an improvement? Please submit a feature request{' '}
          <a className={linkStyle} href='https://docs.google.com/forms/u/0/d/e/1FAIpQLSffcclnaQmDB9bNKITEtw4O3bmF_NOinL-Wu_0jIPvTHZLSvw/formResponse' target='_blank'>
            here
          </a>
          , and I will get back to you as soon as I can.
        </p>
      </div>
    </main>
  )
}