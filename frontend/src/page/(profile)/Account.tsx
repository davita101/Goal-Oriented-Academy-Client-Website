import * as React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Separator } from '../../components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Card } from '../../components/ui/card';

export default function Account() {
  const { user } = useAuthStore();
  const data: { [key: string]: any } = user ? {
    userInfo: {
      name: user?.user?.name,
      nickname: user?.user?.nickname,
      email: user?.user?.email,
      role: user?.user?.role,
    },
    social: {
      facebook: user?.user?.social?.facebook,
      github: user?.user?.social?.github,
      linkedin: user?.user?.social?.linkedin,
      codewars: user?.user?.social?.codewars,
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
            parent: user?.user?.information?.leaderInformation?.rating?.leaderCheck?.parentRating,
            exam: user?.user?.information?.leaderInformation?.rating?.leaderCheck?.examResults,
            codewars: user?.user?.information?.leaderInformation?.rating?.leaderCheck?.codewarsResult,
            project: user?.user?.information?.leaderInformation?.rating?.leaderCheck?.projectResults,
          },
        },
        githubCheck: {
          miniLeader: user?.user?.information?.leaderInformation?.githubCheck?.miniLeaderCheck,
          student: user?.user?.information?.leaderInformation?.githubCheck?.studentCheck,
        },
        finallyRating: {
          finally: user?.user?.information?.leaderInformation?.finallyRating,
          Salary: user?.user?.information?.leaderInformation?.finalSalary,
        }
      },
      mentorInformation: {
        rating: {
          cards: {
            green: user?.user?.information?.mentorInformation?.rating?.cards?.green,
            yellow: user?.user?.information?.mentorInformation?.rating?.cards?.yellow,
            purple: user?.user?.information?.mentorInformation?.rating?.cards?.purple,
            black: user?.user?.information?.mentorInformation?.rating?.cards?.black,
          },
          check: {
            githubCheck: user?.user?.information?.mentorInformation?.rating?.githubCheck,
            exam: user?.user?.information?.mentorInformation?.rating?.exam,
          }
        },
        //todo mentorControl: user?.user?.information?.mentorInformation?.mentorControl,
        finallyRating: {
          finalSalary: user?.user?.information?.mentorInformation?.finalSalary,
          finallyRating: user?.user?.information?.mentorInformation?.finallyRating,
        }
      },
      mentorAssistantInformation: {
        rating: {
          cards: {
            green: user?.user?.information?.mentorAssistantInformation?.rating?.cards?.green,
            yellow: user?.user?.information?.mentorAssistantInformation?.rating?.cards?.yellow,
            purple: user?.user?.information?.mentorAssistantInformation?.rating?.cards?.purple,
            black: user?.user?.information?.mentorAssistantInformation?.rating?.cards?.black,
          },
          check: {
            githubCheck: user?.user?.information?.mentorAssistantInformation?.rating?.githubCheck,
            exam: user?.user?.information?.mentorAssistantInformation?.rating?.exam,
          }
        },
        //todo mentorControl: user?.user?.information?.mentorAssistantInformation?.mentorControl,
        finallyRating: {
          finalSalary: user?.user?.information?.mentorAssistantInformation?.finalSalary,
          finallyRating: user?.user?.information?.mentorAssistantInformation?.finallyRating,
        }
      },
    },
    controllers: {
      leaderController: user?.user?.controllers?.leaderController,
      miniLeaderController: user?.user?.controllers?.miniLeaderController,
      githubController: user?.user?.controllers?.githubController,
      mentorController: user?.user?.controllers?.mentorController,
      mentorAssistantController: user?.user?.controllers?.mentorAssistantController,
      miniMentorController: user?.user?.controllers?.miniMentorController,
    },
    loginInfo: {
      updatedAt: user?.user?.updatedAt,
      lastLogin: user?.user?.lastLogin,
    }
  } : {};

  React.useEffect(() => {
  }, [data]);

  return (
    <div>
      <Accordion type="single" collapsible className=' grid gap-1 md:grid-cols-1 lg:grid-cols-5 gird-col-1 p-1'>
        {/* //* leaderInfo */}
        {Object.entries(data).map(([dataKey]) => (
          dataKey == "information" ? (
            (
              <div key={`data-key-${dataKey}`}>
                {/*  
                leaderInfo 
                |  rating
                */}
                {Object.entries(data[dataKey]).map(([keyInformation]) => (
                  <AccordionItem
                    key={`data-item-key-${keyInformation}`}
                    value={`data-item-dataKey-${keyInformation}`}
                    title={keyInformation}>
                    <Card className={"rounded-sm"}>
                      <AccordionTrigger className="p-2 font-bold leading-[5px] text-slate-400 capitalize">
                        <b>{keyInformation}</b>
                      </AccordionTrigger>
                      {Object.entries(data[dataKey][keyInformation]).map(([subKeyInformation]) => (
                        /*  
                          leaderInfo 
                          |  rating
                          |  |  cards
                          */
                        <Accordion key={`subKeyInformation-${subKeyInformation}`} type="single" collapsible className=' grid md:grid-cols-1 lg:grid-cols-1 gird-col-1 p-1'>
                          <AccordionContent className="p-2 grid grid-cols-2 items-center w-full justify-start gap-2">
                            <AccordionItem
                              key={`data-item-key-sub-key-${subKeyInformation}`}
                              value={`data-item-key-sub-key-${subKeyInformation}`}
                              title={subKeyInformation} className='col-span-2'>
                              <AccordionTrigger className='p-2 font-bold leading-[5px] text-slate-400 capitalize'>
                                {[subKeyInformation]}
                              </AccordionTrigger>
                              {Object.entries(data[dataKey][keyInformation][subKeyInformation]).map(([infoKey, index]) => (
                                /*  
                                  leaderInfo 
                                  |  rating
                                  |  |  cards
                                  |  |  |  green
                                  */
                                <AccordionContent key={`ifoKey-${infoKey}-${index}`} className='p-2 grid grid-cols-1'>
                                  {((typeof data[dataKey][keyInformation][subKeyInformation][infoKey]) === "object") ? (
                                    <Accordion type="single" collapsible className=' grid md:grid-cols-1 lg:grid-cols-1 gird-col-1 p-1'>
                                      <AccordionItem value={`data-item-infoKey-${infoKey}`} title={infoKey}>
                                        <AccordionTrigger className="p-2 font-bold leading-[5px] text-slate-400 capitalize">
                                          <b>{infoKey}</b>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-2 grid grid-cols-1 items-center w-full justify-start gap-2">
                                          {Object.entries(data[dataKey][keyInformation][subKeyInformation][infoKey]).map(([key]) => (
                                            <div key={`key-${key}`} className="grid grid-cols-4 text-slate-600 dark:text-green-400 font-bold">
                                              <span className="col-start-1 font-bold capitalize">{key}</span>
                                              <span className="col-span-3 break-words text-end text-slate-600 dark:text-green-400 font-bold">{JSON.stringify(data[dataKey][keyInformation][subKeyInformation][infoKey][key])}</span>
                                              <Separator className="col-span-4" />
                                            </div>
                                          ))}
                                        </AccordionContent>
                                      </AccordionItem>
                                    </Accordion>
                                  ) :
                                    <span className="col-start-1 font-bold capitalize">{infoKey}</span>
                                  }

                                  {typeof data[dataKey][keyInformation][subKeyInformation][infoKey] !== "object" && (
                                    <div className="col-span-4 row-span-2 break-words text-slate-500/50 dark:text-green-400 font-bold">
                                      {
                                        <>
                                          {JSON.stringify(data[dataKey][keyInformation][subKeyInformation][infoKey])}
                                        </>
                                      }
                                    </div>
                                  )}
                                </AccordionContent>
                              ))}
                            </AccordionItem>
                          </AccordionContent>
                        </Accordion>
                      ))}
                    </Card>
                  </AccordionItem>))}
              </div>
            )
          )

            : (<AccordionItem key={`data-item-key-${dataKey}`} value={`data-item-dataKey-${dataKey}`} title={dataKey}>
              <Card>
                <AccordionTrigger className="p-2 font-bold leading-[5px] text-slate-400 capitalize">
                  <b>{dataKey}</b>
                </AccordionTrigger>
                {data[dataKey] && Object.entries(data[dataKey]).map(([dataItem]) => (
                  <div key={`index-${dataItem}`}>
                    <AccordionContent className="p-2  grid grid-cols-4 items-center w-full justify-start gap-2">
                      <span className="col-start-1 font-bold capitalize">{dataItem}</span>
                      <span className="col-span-4 row-span-2 break-words text-slate-500/50 dark:text-green-400 font-bold">{data[dataKey][dataItem]}</span>
                      <Separator className="row-start-2 col-span-4" />
                    </AccordionContent>
                  </div>
                ))}
              </Card>
            </AccordionItem>)
        ))}
      </Accordion>
    </div>
  );
}