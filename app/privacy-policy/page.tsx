import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className='dark'>
      <h1 className='scroll-m-20 text-3xl font-bold tracking-tight leading-loose'>Privacy policy</h1>
      <Link href='/' className='underline'>Return home</Link>
      <h2 className='scroll-m-20 text-2xl font-bold tracking-tight leading-loose'>In a nutshell: how Schoology Flashcards handles your data</h2>
      <ol className='list-decimal list-inside'>
        <li>You enter your Schoology login school ID and password. Both are sent to the server. If you're on https, this info is impossible to intercept.</li>
        <li>The server then uses your school ID and password to sign into Schoology, creating a Schoology session. The server saves the Schoology session but discards your school ID and password.</li>
        <li>The server fetches a list of your courses using the session.</li>
        <li>If you select a course, the server fetches the name and photo URL of all members in that course.</li>
      </ol>
      <h2 className='scroll-m-20 text-2xl font-bold tracking-tight leading-loose'>Removal of data</h2>
      <ul className='list-disc list-inside'>
        <li>
          If you want your name removed from the leaderboard, please fill out{' '}
          <a className='underline' href='https://docs.google.com/forms/u/0/d/e/1FAIpQLSffcclnaQmDB9bNKITEtw4O3bmF_NOinL-Wu_0jIPvTHZLSvw/formResponse' target='_blank'>
            this Google Form.
          </a>
        </li>
        <li>
          Please fill out the same Google Form for other data removal.
        </li>
      </ul>
      <h2 className='scroll-m-20 text-2xl font-bold tracking-tight leading-loose'>Feature requests</h2>
      <p>
        Have a really good idea for how to improve this website? Please submit a feature request{' '}
        <a className='underline' href='https://docs.google.com/forms/u/0/d/e/1FAIpQLSffcclnaQmDB9bNKITEtw4O3bmF_NOinL-Wu_0jIPvTHZLSvw/formResponse' target='_blank'>
          here
        </a>
        , and I will get back to you as soon as I can.
      </p>
      <p>
        Currently, the UI is trash by design (speed and number of features {'>'} looks).
      </p>
    </main>
  )
}