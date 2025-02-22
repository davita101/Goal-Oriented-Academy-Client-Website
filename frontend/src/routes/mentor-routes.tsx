import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { MentorGroup } from '../page/(mentor)/Mentor'
import Groups from '../page/(mentor)/Groups'
import { useAuthStore } from '../store/authStore';
import Loading from '../components/loading';
import LessonEventGroup from '../page/(mentor)/LessonEventGroup';

export default function MentorRoutes() {
  const { user } = useAuthStore()
  if (
    !user?.user?.role?.includes('mentor') &&
    !user?.user?.role?.includes('mentorAssistant') &&
    !user?.user?.role?.includes('admin')
  ) {
    return <div>
      <Loading />
      NOT AUTHORIZE
    </div>;
  }

  return (
    <>
      <Routes>
        <Route path="/group" element={<Groups />} />
        <Route path="/group/:groupId/:lessonEventId" element={<LessonEventGroup />} />
        <Route path="/group/startEvent/:groupId/:lessonEventId" element={<MentorGroup />} />
      </Routes>
    </>
  )
}
