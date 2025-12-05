import {useForm, Controller} from 'react-hook-form';
import Input from '../shared/form/input';
import React, {useState} from "react";
import Button from "@/components/shared/button";
import {RadioGroup, RadioGroupItem} from "@/components/shared/radio-group";

interface ShippingFormData {
	firstName: string
	lastName: string
	address: string
	aptSuite: string
	city: string
	country: string
	stateProvince: string
	postalCode: string
	addressType: "home" | "office"
}

interface ShippingAddressProps {
	onComplete: (data: ShippingFormData) => void
}

const ShippingAddress: React.FC<ShippingAddressProps> = ({onComplete}) => {
	const [isOpen, setIsOpen] = useState(false);
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<ShippingFormData>({
		defaultValues: {
			firstName: "Luhan",
			lastName: "Nguyen",
			address: "589 Sunset Blvd, Los Angeles",
			aptSuite: "55U - DD5",
			city: "Norris",
			country: "United States",
			stateProvince: "Los Angeles",
			postalCode: "90017",
			addressType: "home",
		},
	})
	
	const [addressType, setAddressType] = useState("home");
	
	return (
		<div className="w-full">
			<form onSubmit={handleSubmit(onComplete)} noValidate>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* First name and Last name */}
					<Input
						label={"First Name"}
						{...register("firstName", {
							required: 'FirstName is required',
						})}
						error={errors.firstName?.message}
					/>
					
					<Input
						label={"Last Name"}
						{...register("lastName", {
							required: 'LastName is required',
						})}
						error={errors.lastName?.message}
					/>
					
					{/* Address and Apt, Suite */}
					<Input
						label={"Address"}
						{...register("address", {
							required: 'Address is required',
						})}
						error={errors.address?.message}
					/>
					
					<Input
						label={"AptSuite"}
						{...register("aptSuite", {
							required: 'AptSuite is required',
						})}
						className="w-full "
					/>
					
					{/* City and Country */}
					<Input
						label={"City"}
						{...register("city", {
							required: 'City is required',
						})}
						className="w-full "
					/>
					
					<div className="space-y-2">
						<label htmlFor="country"
						       className={`block text-brand-dark font-medium text-sm leading-none mb-3 cursor-pointer`}>Country</label>
						<div className="relative">
							<Controller
								name="country"
								control={control}
								render={({field}) => (
									<div className="relative">
										<select
											{...field}
											className="w-full h-10 px-3 rounded border bg-gray-100 border-gray-300 text-13px  appearance-none focus:outline-none focus:ring-3 focus:ring-black/5"
											onClick={() => setIsOpen(!isOpen)}
										>
											<option value="United States">United States</option>
											<option value="Canada">Canada</option>
											<option value="United Kingdom">United Kingdom</option>
											<option value="Australia">Australia</option>
											<option value="Germany">Germany</option>
										</select>
										
									</div>
								)}
							/>
						</div>
					</div>
					
					{/* State/Province and Postal code */}
					<Input
						label={"StateProvince"}
						{...register("stateProvince", {
							required: 'State Province is required',
						})}
						className="w-full "
					/>
					<Input
						label={"PostalCode"}
						{...register('postalCode', {
							required: 'Phone number is required',
							pattern: {
								value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, // allows international formats
								message: 'Please enter a valid phone number',
							}
						})}
						className="w-full "
					/>
				
				
				</div>
				
				{/* Address type */}
				<div className="mt-6">
					<label htmlFor="country"
					       className={`block text-brand-dark font-medium text-sm leading-none mb-3 cursor-pointer`}>Country</label>
					<div className="mt-2  ">
						<RadioGroup value={addressType} onValueChange={setAddressType} className={"grid-cols-1 sm:grid-cols-2 sm:gap-6"}>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value={'home'} id="r1"/>
								<label htmlFor="r1" className="text-sm font-medium text-brand-dark">
									Home <span className="font-light">(All Day Delivery)</span>
								</label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value='office' id="r2"/>
								<label htmlFor="r2" className="text-sm font-medium text-brand-dark">
									Office <span className="font-light">(Delivery 9 AM - 5 PM)</span>
								</label>
							</div>
						</RadioGroup>
					</div>
				</div>
				
				<div className="ltr:text-right rtl:text-left mt-10">
					<Button
						type="submit"
						variant="formButton"
						className="xs:text-sm  text-brand-light"
					>
						Save and Next Steps
					</Button>
				</div>
			</form>
		
		</div>
	);
};

export default ShippingAddress;
