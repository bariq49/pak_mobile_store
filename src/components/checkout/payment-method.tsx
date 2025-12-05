'use client';
import {useForm} from 'react-hook-form';
import Input from '../shared/form/input';
import React from "react";
import Button from "@/components/shared/button";

type PaymentFormData = {
	cardNumber: string
	nameOnCard: string
	expirationDate: string
	cvc: string
}

interface PaymentMethodProps {
	onComplete: (data: PaymentFormData) => void
}


const PaymentMethod: React.FC<PaymentMethodProps> = ({ onComplete }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PaymentFormData>({
		defaultValues: {
			cardNumber: "5123450000000008",
			nameOnCard: "Luhan",
			expirationDate: "09/25",
			cvc: "123",
		},
	})
	
	
	// Format card number with spaces
	const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
		const formattedValue = value.replace(/\d{4}(?=.)/g, "$& ")
		e.target.value = formattedValue.slice(0, 19) // Limit to 16 digits + 3 spaces
	}
	
	// Format expiration date as MM/YY
	const formatExpirationDate = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "")
		if (value.length <= 2) {
			e.target.value = value
		} else {
			e.target.value = `${value.slice(0, 2)}/${value.slice(2, 4)}`
		}
	}
	
	// Limit CVC to 3-4 digits
	const formatCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "")
		e.target.value = value.slice(0, 4)
	}
	
	
	return (
		<div className="w-full ">
			<form onSubmit={handleSubmit(onComplete)}>
				<div className="space-y-6">
					{/* Card number */}
					<div className="space-y-2">
						<Input
							label="Card number"
							{...register("cardNumber", {
								required: true,
								pattern: /^[\d\s]{13,19}$/,
							})}
							className="rounded-md mb-0"
							placeholder=""
							onChange={formatCardNumber}
							maxLength={19}
							inputMode="numeric"
						/>
						{errors.cardNumber &&
                            <p className="text-sm text-red-500 m-0">Please enter a valid card number</p>}
					</div>
					
					{/* Name on Card */}
					<div className="space-y-2">
						<Input
							label="Name on Card"
							{...register("nameOnCard", {required: true})}
							className="rounded-md border-gray-300"
							placeholder=""
						/>
						{errors.nameOnCard &&
                            <p className="text-sm text-red-500">Please enter the name on your card</p>}
					</div>
					
					{/* Expiration date and CVC */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<Input
								label="Expiration date (MM/YY)"
								{...register("expirationDate", {
									required: true,
									pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
								})}
								className=" border-gray-300 "
								placeholder="MM/YY"
								onChange={formatExpirationDate}
								maxLength={5}
								inputMode="numeric"
							/>
							{errors.expirationDate &&
                                <p className="text-sm text-red-500">Please enter a valid expiration date</p>}
						</div>
						
						<div>
							<Input
								label="CVC"
								{...register("cvc", {
									required: true,
									pattern: /^[0-9]{3,4}$/,
								})}
								className=" border-gray-300 "
								placeholder="CVC"
								onChange={formatCVC}
								maxLength={4}
								inputMode="numeric"
							/>
							{errors.cvc && <p className="text-sm text-red-500">Please enter a valid CVC</p>}
						</div>
					</div>
					
					{/* Submit button */}
					<div className="mt-8">
						<Button
							type="submit"
							className="w-full mt-2"
							variant="formButton"
						>
							Complete Payment
						</Button>
					
					</div>
				</div>
			</form>
		</div>
);
};

export default PaymentMethod;
