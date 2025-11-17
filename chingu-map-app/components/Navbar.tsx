import Link from "next/link"

export default function Navbar() {
  return (
    <nav className='py-5 px-5 text-2xl'>
      <ul className='flex justify-end gap-5'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/list'>List</Link>
        </li>
        <li>
          <Link href='/map'>Map</Link>
        </li>
      </ul>
    </nav>
  )
}
