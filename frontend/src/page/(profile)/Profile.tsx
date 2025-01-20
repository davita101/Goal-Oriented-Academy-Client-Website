import React, { useEffect } from 'react'
import { Separator } from '../../components/ui/separator'
import { Input } from '../../components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, } from '../../components/ui/form'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../../interface/(user)/form';
import { useAuthStore } from '../../store/authStore';
import { t } from 'i18next';
import { User } from '../../interface/(user)/user';
import { useLeaderStore } from '../../store/leaderStore';
import { Button } from '../../components/ui/button';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { ScrollArea, ScrollBar } from '../../components/ui/scroll-area';

export default function Profile() {
  const { user } = useAuthStore();
  const { leaderUpdate, isLoading } = useLeaderStore();

  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.user?.name || '',
      nickname: user?.user?.nickname || '',
      avatar: user?.user?.avatar || '',
      email: user?.user?.email || '',
      miniLeaderId: user?.user?.miniLeaderId || '',
      social: {
        facebook: user?.user?.social?.facebook || '',
        linkedin: user?.user?.social?.linkedin || '',
        github: user?.user?.social?.github || '',
      }
    }
  });

  useEffect(() => {
    if (user?.user?.name) {
      form.setValue('name', user?.user?.name);
      form.setValue('nickname', user?.user?.nickname);
      form.setValue('avatar', user?.user?.avatar);
      form.setValue('email', user?.user?.email);
      form.setValue('social.facebook', user?.user?.social?.facebook);
      form.setValue('social.github', user?.user?.social?.github);
      form.setValue('social.linkedin', user?.user?.social?.linkedin);
      form.setValue('miniLeaderId', user?.user?.miniLeaderId);
    }
  }, [user, form]);

  interface FormData {
    name: 'name' | 'avatar' | 'nickname' | "email" | "social.facebook" | "social.linkedin" | "social.github" | "miniLeaderId";
    label: string;
    type: string;
  }

  const data: FormData[] = [
    {
      name: 'miniLeaderId',
      label: 'mini Leader Id',
      type: 'string',
    },
    {
      name: 'name',
      label: 'username and surname',
      type: 'text',
    },
    {
      name: 'nickname',
      label: 'nickname',
      type: 'text',
    },
    {
      name: 'avatar',
      label: 'Avatar Url',
      type: 'url',
    },
    {
      name: 'email',
      label: 'email',
      type: 'email',
    },
    {
      name: 'social.facebook',
      label: 'facebook',
      type: 'url',
    },
    {
      name: 'social.linkedin',
      label: 'linkedin',
      type: 'url',
    },
    {
      name: 'social.github',
      label: 'github',
      type: 'url',
    },

  ]
  const onSubmit: SubmitHandler<User> = (data) => {
    leaderUpdate(user?.user?._id || '', data);
  };
  return (

    <div className=''>
      <div className='p-2'>
        <h2 className='font-bold text-2xl text-green-400'>Profile</h2>
        <p>This is how others will see you on the site.</p>
      </div>
      <Separator className='ml-2 bg-black dark:bg-foreground my-2' />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-4'>
          {data.map((item, index) => (
            (
              <FormField
                key={`form-field-${index}`}
                control={form.control}
                name={item.name}
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-1 mb-2">
                    <FormLabel className="capitalize font-bold text-md">{item.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={item.type}
                        className=" col-span-3 "
                        placeholder={item.label}
                        {...field}
                        value={field.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <Separator className='col-span-4 ' />
                  </FormItem>
                )}
              />
            )
          ))}
          <Button

            type='submit'
            variant={'green'}
            onClick={() =>
              toast("user has been updated", {
                description: `${user?.user?.updatedAt}`,
                action: {
                  label: "Close",
                  onClick: () => console.log("Close"),
                }
              })}
            className='mt-1'>Save data{isLoading && <RefreshCw className='animate-spin' />}</Button>
        </form >
      </Form>
    </div >
  )
}