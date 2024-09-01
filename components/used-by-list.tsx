import { useEffect, useState } from "react";


export default function UsedByList() {
  const [users, setUsers] = useState([]);

  async function updateUsers() {
    let r = await fetch('http://localhost/flashcards/get_users');
    setUsers(await r.json());
  }

  useEffect(() => {
    updateUsers();
    const interval = setInterval(updateUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ol className='flex flex-col gap-2 list-decimal list-outside pl-12'>
      {users.map(({name, profile_picture_url, score}) => (
        <li key={profile_picture_url+name}>
          <div className='inline-flex gap-2 items-baseline'>

            <img className='size-4' src={profile_picture_url} />
            {name} -{' '}
            {score} {score != 1 ? "classes" : "class"} completed
          </div>
        </li>
      ))}
    </ol>
  )
}