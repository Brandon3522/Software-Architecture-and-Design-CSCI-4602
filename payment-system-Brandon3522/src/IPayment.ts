
export interface IPayment{
    obtain_info(): string[];
    validate_info(): boolean;
}