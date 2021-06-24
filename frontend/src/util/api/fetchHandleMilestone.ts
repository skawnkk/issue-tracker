import API, { authorizedHeaders } from 'util/api/api';

export default async function fetchHandleMilestone(milestoneID?: number, status: string = 'open'){
  const token = localStorage.getItem('token')
  try{
    const response = await fetch(API.getMilestone(status),{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json',
      ... authorizedHeaders(token)},
      body: JSON.stringify({"issueNumbers": [milestoneID]})
    })
    if(response.status!==200) throw new Error('잘못된 요청입니다.');
    return response.status
  } catch(error){
    console.error('마일스톤 닫기 에러:', error)
  }

}