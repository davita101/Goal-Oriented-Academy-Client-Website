
//! future !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
// import { Input } from "../components/ui/input";
// import { Separator } from "../components/ui/separator";
// import { Student } from "../schema/interface";

// export const formRender = (typeMain: string, minNum: number, maxNum: number, id: string, label: string, roles: string[], row: string) => {
//     <Separator />
//     if (typeMain === 'number') {
//         return (
//             <FormField
//                 control={form.control}
//                 name={id as keyof Student}
//                 render={({ field, fieldState: { error } }) => (
//                     <FormItem className="grid grid-cols-4 items-center w-full justify-start gap-2">
//                         <FormLabel className="grid-cols-2 capitalize">{label}</FormLabel>
//                         <FormControl>
//                             <Input
//                                 type={typeMain}
//                                 className="col-span-3"
//                                 placeholder={`Enter ${label}`}
//                                 min={minNum}
//                                 max={maxNum}
//                                 {...field}
//                                 value={typeof field.value === 'boolean' || typeof field.value === 'object' ? '' : field.value}
//                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                                     const value = e.target.value === '' ? '' : Number(e.target.value);
//                                     const numericValue = Number(value);
//                                     if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= maxNum) {
//                                         field.onChange(value);
//                                         handleInputChange(oneRowSelection, id, value);
//                                     }
//                                 }}
//                             />
//                         </FormControl>
//                         <FormMessage className="col-span-3">{error?.message}</FormMessage>
//                     </FormItem>
//                 )}
//             />
//         )
//     } else if (typeMain === 'string') {
//         return (
//             <FormField
//                 control={form.control}
//                 name={id as keyof Student}
//                 render={({ field, fieldState: { error } }) => (
//                     <FormItem className="grid grid-cols-4  items-center w-full justify-start gap-2">
//                         <FormLabel className="grid-cols-2">{label}</FormLabel>
//                         <FormControl>
//                             <Input
//                                 className="col-span-3"
//                                 placeholder={`Enter ${label}`}
//                                 {...field}
//                                 value={typeof field.value === 'boolean' || typeof field.value === 'object' ? '' : field.value}
//                                 onChange={(e) => {
//                                     field.onChange(e);
//                                     handleInputChange(oneRowSelection, id, e.target.value);
//                                 }}
//                             />
//                         </FormControl>
//                         <FormMessage className="col-span-3">{error?.message}</FormMessage>
//                     </FormItem>
//                 )}
//             />
//         )
//     } else if (typeMain === 'role') {
//         return (
//             <FormField
//                 control={form.control}
//                 name={id as keyof Student}
//                 render={({ fieldState: { error } }) => (
//                     <FormItem className="grid grid-cols-4 items-center w-full justify-start gap-2">
//                         <FormLabel className="grid-cols-2">Role</FormLabel>
//                         <FormField
//                             control={form.control}
//                             name={id as keyof Student}
//                             render={({ field, fieldState: { error } }) => (
//                                 <FormItem className="col-span-3">
//                                     <Select onValueChange={field.onChange} defaultValue={typeof field.value === 'string' ? field.value : undefined}>
//                                         <SelectTrigger >
//                                             <SelectValue placeholder="Select a fruit" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             <SelectGroup>
//                                                 {roles.map((role, index) => (
//                                                     <SelectItem key={index} value={role}>
//                                                         {role}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectGroup>
//                                         </SelectContent>
//                                     </Select>
//                                     <FormMessage className="col-span-3">{error?.message}</FormMessage>
//                                 </FormItem>
//                             )}
//                         />
//                     </FormItem>
//                 )}
//             />
//         )
//     }
// }