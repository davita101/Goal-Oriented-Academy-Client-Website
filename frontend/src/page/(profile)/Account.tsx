import * as React from 'react'
import { useAuthStore } from '../../store/authStore'
import { Separator } from '../../components/ui/separator'
import { JSX } from 'react'

export default function Account() {
  const { user } = useAuthStore()
  const data = {
    name: user?.user?.name,
    nickname: user?.user?.nickname,
    avatar: user?.user?.avatar,
    email: user?.user?.email,
    miniLeaderId: user?.user?.miniLeaderId,
    social: {
      facebook: user?.user?.social?.facebook,
      github: user?.user?.social?.github,
      linkedin: user?.user?.social?.linkedin,
    },
    information: {
      leaderInformation: {
        rating: {
          cards: {
            green: user?.user?.information?.leaderInformation?.rating?.cards?.green,
            yellow: user?.user?.information?.leaderInformation?.rating?.cards?.yellow,
            purple: user?.user?.information?.leaderInformation?.rating?.cards?.purple,
            black: user?.user?.information?.leaderInformation?.rating?.cards?.black,
          },
          leaderCheck: {
            leaderGithubCheck: user?.user?.information?.leaderInformation?.rating?.leaderCheck?.leaderGithubCheck,
            leaderCodewarsUrl: user?.user?.information?.leaderInformation?.rating?.leaderCheck?.leaderCodewarsUrl,
            parentRating: user?.user?.information?.leaderInformation?.rating?.leaderCheck?.parentRating,
            examResults: {
              firstCheck: user?.user?.information?.leaderInformation?.rating?.leaderCheck?.examResults?.firstCheck,
              secondCheck: user?.user?.information?.leaderInformation?.rating?.leaderCheck?.examResults?.secondCheck,
            },
            codewarsResult: user?.user?.information?.leaderInformation?.rating?.leaderCheck?.codewarsResult,
            projectResults: user?.user?.information?.leaderInformation?.rating?.leaderCheck?.projectResults,
            leaderGithubUrl: user?.user?.information?.leaderInformation?.rating?.leaderCheck?.leaderGithubUrl,
          },
        },
        githubCheck: {
          miniLeaderCheck: {
            firstCheck: user?.user?.information?.leaderInformation?.githubCheck?.miniLeaderCheck?.firstCheck,
            secondCheck: user?.user?.information?.leaderInformation?.githubCheck?.miniLeaderCheck?.secondCheck,
          },
          studentCheck: {
            firstCheck: user?.user?.information?.leaderInformation?.githubCheck?.studentCheck?.firstCheck,
            secondCheck: user?.user?.information?.leaderInformation?.githubCheck?.studentCheck?.secondCheck,
          },
        },
        finallyRating: user?.user?.information?.leaderInformation?.finallyRating,
        finalSalary: user?.user?.information?.leaderInformation?.finalSalary,
      },
      mentorInformation: {
        rating: {
          cards: {
            green: user?.user?.information?.mentorInformation?.rating?.cards?.green,
            yellow: user?.user?.information?.mentorInformation?.rating?.cards?.yellow,
            purple: user?.user?.information?.mentorInformation?.rating?.cards?.purple,
            black: user?.user?.information?.mentorInformation?.rating?.cards?.black,
          },
          exam: user?.user?.information?.mentorInformation?.rating?.exam,
          githubCheck: {
            firstCheck: user?.user?.information?.mentorInformation?.rating?.githubCheck?.firstCheck,
          },
        },
        mentorControl: user?.user?.information?.mentorInformation?.mentorControl,
        finallyRating: user?.user?.information?.mentorInformation?.finallyRating,
        finalSalary: user?.user?.information?.mentorInformation?.finalSalary,
      },
      mentorAssistantInformation: {
        rating: user?.user?.information?.mentorAssistantInformation?.rating,
        control: user?.user?.information?.mentorAssistantInformation?.control,
        finallyRating: user?.user?.information?.mentorAssistantInformation?.finallyRating,
        finalSalary: user?.user?.information?.mentorAssistantInformation?.finalSalary,
      },
    },
    role: user?.user?.role,
    controllers: {
      leaderController: user?.user?.controllers?.leaderController,
      miniLeaderController: user?.user?.controllers?.miniLeaderController,
      githubController: user?.user?.controllers?.githubController,
      mentorController: user?.user?.controllers?.mentorController,
      mentorAssistantController: user?.user?.controllers?.mentorAssistantController,
      miniMentorController: user?.user?.controllers?.miniMentorController,
    },
    isVerified: user?.user?.isVerified,
    restEmailExpiredAt: user?.user?.restEmailExpiredAt,
    updatedAt: user?.user?.updatedAt,
    lastLogin: user?.user?.lastLogin,
    clientId: user?.user?.clientId,
  };
  const renderData = (data: any): JSX.Element[] => {
    return Object.keys(data).flatMap((key) => {
      if (typeof data[key] === 'object' && data[key] !== null) {
        return renderData(data[key]);
      } else {
        return (
          <div key={key} className='p-2'>
            <div className=' grid grid-cols-2 gap-2 items-center'>
              <h2 className='text-md font-bold'>{key}</h2>
              <h2 className='text-md font-bold col-start-2'>{data[key]}</h2>
              <Separator className='col-span-2' />
            </div>
          </div>
        );
      }
    });
  };


  return (
    <div>{renderData(data)}</div>
  )
}
