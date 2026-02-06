import { NavLink, Outlet } from 'react-router'

function Layout() {
    return (

        <div className='flex flex-col justify-center items-center max-w-5xl px-5 w-full'>
            <div className='py-5 flex w-full items-center'>
                <div className='size-15 bg-gray-400'>logo</div>
                <div className='grow ' />
                <div className='flex gap-4'>
                    <NavLink to={"/"}>Home</NavLink>
                    <NavLink to={"/location"}>Locations</NavLink>
                    <NavLink to={"/issues"}>Issues</NavLink>
                </div>
            </div>
            <div className='w-full'><Outlet /></div>
        </div>
    )
}

export default Layout