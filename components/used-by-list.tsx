import { useEffect, useState } from "react";


export default function UsedByList() {
  const [users, setUsers] = useState([]);

  async function updateUsers() {
    let r = await fetch('https://schoology-flashcards.fly.dev/get_users');
    setUsers(await r.json());
  }

  useEffect(() => {
    updateUsers();
    const interval = setInterval(updateUsers, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-wrap gap-2 text-xs'>
      {users.map(({name, profile_picture_url, score}) => (
        <div className='flex'>
          <img className='size-4' src={profile_picture_url} />
          {name} -{' '}
          {score} classes
        </div>
      ))}
    </div>
  )
}