import React from 'react'

// import { payments } from '@/lib/data'
import { Card, CardDescription } from '@/components/ui/card'



const UsersPage = async () => {
 



  return (
    <div className='flex flex-col p-3 w-full'>
      <Card className='w-full p-5 mb-2'>
        <CardDescription className='flex flex-row items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold'>
              Users Table
            </h2>
            <p className='text-[12px] font-thin'>
              List of all users on the app
            </p>
          </div>
        </CardDescription>
      </Card>

      {/* <Card className='w-full p-5'>
        {users ? <DataTable columns={columns} data={users} /> : <p>No users available</p>}
      </Card> */}
      
    </div>
  )
}

export default UsersPage