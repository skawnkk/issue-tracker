import API, { authorizedHeaders } from 'util/api/api';
import { headerMode, detailTitle } from 'store/detailStore'
import { useSetRecoilState } from 'recoil'
export default async function fetchEditTitle(IsssueID:number, title:string){
  const setPickedTitle = useSetRecoilState(detailTitle)
  const setHeaderMode = useSetRecoilState(headerMode)
  const token = localStorage.getItem('token')
  try { 
    const response = await fetch(API.editIssueTitle(IsssueID),{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json',
                ... authorizedHeaders(token)},
      body: JSON.stringify({ 'title' : title })
    })
    const editedTitle = await response.json()
    setPickedTitle(editedTitle.title)
    setHeaderMode({view: true, edit: false})
  } catch(error){
    console.log(error)
  }
}