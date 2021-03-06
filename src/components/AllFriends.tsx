/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useQuery, gql } from "@apollo/client"
import IFriend from "../interfaces/interfaces"


interface iFriends {
  getAllFriends: IFriend[]
}

export const ALL_FRIENDS = gql`
query {
  getAllFriends{
    id
    firstName
    lastName
    email
  }
} 
`

export default function All() {
  const { loading, error, data, refetch } = useQuery<iFriends>(
    ALL_FRIENDS,
    {
      fetchPolicy: "cache-and-network"
    }
  )
  if (loading) return <p>loading...</p>
  if (error) return <p>{error.toString()}</p>
  return (
    <div>
      <table className="table">
        <thead>
          <tr><th>ID</th><th>firstName</th><th>lastName</th><th>email</th></tr>
        </thead>
        <tbody>
          {data && data.getAllFriends.map(f => (
            <tr key={f.id}><td>{f.id}</td><td>{f.firstName}</td><td>{f.lastName}</td><td>{f.email}</td></tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => refetch()}>Refetch</button>
    </div>
  )
}