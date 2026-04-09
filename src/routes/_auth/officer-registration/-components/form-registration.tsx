import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DropdownSelect } from "@/components/DropdownSelect";
import { useState } from "react";
import IconHead from "@/components/svg-icon/icon-head";
import { OfficerRegistrationSchema, type TOfficerRegistrationSchema } from "../-type";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useOfficerRegistration } from "../-api/use-officer-registration";
import {
    User,
    MapPin,
    Briefcase,
    Phone,
    ShieldCheck,
    Calendar as CalendarIcon,
    Mail,
    UserCircle,
    BadgeCheck,
    Clock,
    FileText
} from "lucide-react";

const officerTypeOptions = [
    { label: "Commissioned", value: "commissioned" },
    { label: "Non-commissioned", value: "non-commissioned" },
];

const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
];

const employmentTypeOptions = [
    { label: "Full-time", value: "full-time" },
    { label: "Part-time", value: "part-time" },
    { label: "Contract", value: "contract" },
];

const shiftScheduleOptions = [
    { label: "Day Shift", value: "day" },
    { label: "Night Shift", value: "night" },
    { label: "Rotating", value: "rotating" },
];

const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Pending", value: "pending" },
    { label: "Cleared", value: "cleared" },
];

export default function FormRegistration() {
    const [dobOpen, setDobOpen] = useState(false);
    const [licenseExpiryOpen, setLicenseExpiryOpen] = useState(false);
    const [hireDateOpen, setHireDateOpen] = useState(false);

    const form = useForm<TOfficerRegistrationSchema>({
        resolver: zodResolver(OfficerRegistrationSchema),
        defaultValues: {
            user_role: "officer",
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            dob: "",
            gender: "",
            address: "",
            address2: "",
            city: "",
            state: "",
            zip_code: "",
            country: "",
            image: null,
            detail: {
                officer_type: undefined as any,
                background_status: "",
                employment_type: undefined as any,
                hire_date: "",
                shift: undefined as any,
                employee_id: "",
            }
        },
    });

    const {
        control,
        handleSubmit,
    } = form;

    const { mutate: registerOfficer, status } = useOfficerRegistration();

    const onSubmit = (data: TOfficerRegistrationSchema) => {
        registerOfficer(data, {
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                    <IconHead width={100} height={120} />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                    Officer <span className="text-[#e11d48]">Registration</span>
                </h1>
                <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                    Complete the secure enrollment form below. Our team typically reviews applications within 2-3 business days.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                    {/* Personal Information Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-[#e11d48] px-8 py-5 flex items-center gap-4">
                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white tracking-wide uppercase">Profile Information</h2>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FormField
                                control={control}
                                name="first_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            First Name <span className="text-rose-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <UserCircle className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-[#e11d48] transition-colors" />
                                                <Input placeholder="Enter first name" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-[#e11d48]/10 rounded-xl transition-all" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="last_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Last Name <span className="text-rose-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <UserCircle className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-[#e11d48] transition-colors" />
                                                <Input placeholder="Enter last name" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-[#e11d48]/10 rounded-xl transition-all" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Email Address <span className="text-rose-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-[#e11d48] transition-colors" />
                                                <Input type="email" placeholder="e.g. officer@example.com" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-[#e11d48]/10 rounded-xl transition-all" {...field} value={field.value || ""} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Contact Number
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-[#e11d48] transition-colors" />
                                                <Input type="tel" placeholder="+1 (555) 000-0000" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white focus:ring-2 focus:ring-[#e11d48]/10 rounded-xl transition-all" {...field} value={field.value ?? ""} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Date of Birth
                                        </FormLabel>
                                        <FormControl>
                                            <Popover open={dobOpen} onOpenChange={setDobOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full h-12 justify-start px-3 bg-slate-50 border-slate-100 focus:bg-white rounded-xl text-slate-500 font-normal">
                                                        <CalendarIcon className="mr-2 h-5 w-5 text-slate-400" />
                                                        {field.value ? new Date(field.value + "T00:00:00").toLocaleDateString("en-CA") : "Select Date"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value ? new Date(field.value + "T00:00:00") : undefined}
                                                        onSelect={(date) => {
                                                            if (date instanceof Date) {
                                                                const year = date.getFullYear();
                                                                const month = String(date.getMonth() + 1).padStart(2, "0");
                                                                const day = String(date.getDate()).padStart(2, "0");
                                                                field.onChange(`${year}-${month}-${day}`);
                                                                setDobOpen(false);
                                                            }
                                                        }}
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Gender
                                        </FormLabel>
                                        <FormControl>
                                            <DropdownSelect
                                                value={field.value ?? ""}
                                                onChange={field.onChange}
                                                options={genderOptions}
                                                placeholder="Select Gender"
                                                className="h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Address Information Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-slate-900 px-8 py-5 flex items-center gap-4 border-b border-slate-100">
                            <div className="p-2 bg-white/10 rounded-xl">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white tracking-wide uppercase">Address Details</h2>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormField
                                    control={control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-1">
                                            <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                Street Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter street address" className="h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl transition-all" {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="address2"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-1">
                                            <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                Address Line 2 (Optional)
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Apartment, suite, etc." className="h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl transition-all" {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <FormField
                                    control={control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                City
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="City" className="h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl transition-all" {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                State / Province
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="State" className="h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl transition-all" {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="zip_code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                Zip Code
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Postal Code" className="h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl transition-all" {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                                Country
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Country" className="h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl transition-all" {...field} value={field.value || ""} />
                                            </FormControl>
                                            <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Professional Details Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-[#e11d48] px-8 py-5 flex items-center gap-4">
                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white tracking-wide uppercase">Vetting & Credentials</h2>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FormField
                                control={control}
                                name="detail.officer_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Officer Classification <span className="text-rose-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <DropdownSelect
                                                value={field.value ?? ""}
                                                onChange={field.onChange}
                                                options={officerTypeOptions}
                                                placeholder="Select Classification"
                                                className="h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="detail.employee_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Employee ID <span className="text-rose-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <BadgeCheck className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-[#e11d48] transition-colors" />
                                                <Input placeholder="EMP-XXXXX" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl transition-all font-mono" {...field} value={field.value || ""} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="detail.employment_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Contract Type <span className="text-rose-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <DropdownSelect
                                                value={field.value ?? ""}
                                                onChange={field.onChange}
                                                options={employmentTypeOptions}
                                                placeholder="Select Type"
                                                className="h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="detail.shift"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Shift Preference <span className="text-rose-500">*</span>
                                        </FormLabel>
                                        <FormControl>
                                            <DropdownSelect
                                                value={field.value ?? ""}
                                                onChange={field.onChange}
                                                options={shiftScheduleOptions}
                                                placeholder="Select Shift"
                                                className="h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="detail.hire_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Desired Hire Date
                                        </FormLabel>
                                        <FormControl>
                                            <Popover open={hireDateOpen} onOpenChange={setHireDateOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full h-12 justify-start px-3 bg-slate-50 border-slate-100 focus:bg-white rounded-xl text-slate-500 font-normal">
                                                        <Clock className="mr-2 h-5 w-5 text-slate-400" />
                                                        {field.value ? new Date(field.value + "T00:00:00").toLocaleDateString("en-CA") : "Select Date"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value ? new Date(field.value + "T00:00:00") : undefined}
                                                        onSelect={(date) => {
                                                            if (date instanceof Date) {
                                                                const year = date.getFullYear();
                                                                const month = String(date.getMonth() + 1).padStart(2, "0");
                                                                const day = String(date.getDate()).padStart(2, "0");
                                                                field.onChange(`${year}-${month}-${day}`);
                                                                setHireDateOpen(false);
                                                            }
                                                        }}
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="detail.license_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Guard License No.
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-[#e11d48] transition-colors" />
                                                <Input placeholder="LIC-XXXXX" className="pl-10 h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl transition-all" {...field} value={field.value ?? ""} />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="detail.license_expiry_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            License Expiration
                                        </FormLabel>
                                        <FormControl>
                                            <Popover open={licenseExpiryOpen} onOpenChange={setLicenseExpiryOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" className="w-full h-12 justify-start px-3 bg-slate-50 border-slate-100 focus:bg-white rounded-xl text-slate-500 font-normal">
                                                        <CalendarIcon className="mr-2 h-5 w-5 text-slate-400" />
                                                        {field.value ? new Date(field.value + "T00:00:00").toLocaleDateString("en-CA") : "Select Expiry"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value ? new Date(field.value + "T00:00:00") : undefined}
                                                        onSelect={(date) => {
                                                            if (date instanceof Date) {
                                                                const year = date.getFullYear();
                                                                const month = String(date.getMonth() + 1).padStart(2, "0");
                                                                const day = String(date.getDate()).padStart(2, "0");
                                                                field.onChange(`${year}-${month}-${day}`);
                                                                setLicenseExpiryOpen(false);
                                                            }
                                                        }}
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Emergency Contact Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-slate-900 px-8 py-5 flex items-center gap-4 border-b border-slate-100">
                            <div className="p-2 bg-white/10 rounded-xl">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white tracking-wide uppercase">Emergency Contact</h2>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField
                                control={control}
                                name="detail.emergency_contact_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Contact Full Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter emergency contact's name" className="h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl transition-all" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="detail.emergency_contact_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Emergency Phone
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="+1 (555) 000-0000" className="h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl transition-all" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Compliance Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="bg-[#e11d48] px-8 py-5 flex items-center gap-4">
                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white tracking-wide uppercase">Compliance & Status</h2>
                        </div>

                        <div className="p-8">
                            <FormField
                                control={control}
                                name="detail.background_status"
                                render={({ field }) => (
                                    <FormItem className="max-w-md mx-auto">
                                        <FormLabel className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-center gap-2 text-center w-full">
                                            Current Background Clearance
                                        </FormLabel>
                                        <FormControl>
                                            <DropdownSelect
                                                value={field.value ?? ""}
                                                onChange={field.onChange}
                                                options={statusOptions}
                                                placeholder="Select Status"
                                                className="h-12 bg-slate-50 border-slate-100 focus:bg-white rounded-xl"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs font-medium text-rose-500 mt-1 text-center" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="flex flex-col items-center gap-4 pt-12 pb-20">
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full md:w-[350px] h-16 text-lg font-black bg-[#e11d48] hover:bg-[#be123c] text-white shadow-2xl shadow-[#e11d48]/20 transition-all rounded-2xl active:scale-[0.98] uppercase tracking-widest"
                            loading={status === "pending"}
                        >
                            Complete Registration
                        </Button>
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                            <ShieldCheck className="w-4 h-4" />
                            <span>Your data is encrypted and secure</span>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
