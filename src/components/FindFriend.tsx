/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client"
import IFriend from "../interfaces/interfaces"

interface iFriendResult {
  getFriend : IFriend
}

interface iVariableInput {
  id : string
}

const GET_FRIEND = gql`
query getFriendFromEmail($email:String){
  getFriend(email:$email){
    id
    firstName
    lastName
    email
  }
} 
`

export default function FindFriend() {
  const [id, setId] = useState("")
  const [getFriend, {loading,called,data}] = useLazyQuery<iFriendResult, iVariableInput>(
    GET_FRIEND,
    {fetchPolicy:"cache-and-network"}
  );


  const fetchFriend = () => {
    alert(`Find friend with id: ${id}`)
    getFriend({variables: {id}})
  }

  return (
    <div>
      ID:<input type="txt" value={id} onChange={e => {
        setId(e.target.value)
      }} />
      &nbsp; <button onClick={fetchFriend}>Find Friend</button>
      <br />
      <br />

      {called && loading && <p>Loading...</p>}
      {data && (
        <div>
      <p>{data.getFriend.firstName}</p>
      <p>{data.getFriend.lastName}</p>
      </div>
      )}

    </div>)
}
