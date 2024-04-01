import { BaseURL } from "./BaseURL";


// GET
export const GetVerifierById = `${BaseURL}/verifiers/id?id=`;
export const GetVerifierByWalletId = `${BaseURL}/verifiers/wallet?id=`;
export const GetQrScanResult =`${BaseURL}/verifiers/result?id=&vcId=&ticketId=&nftId=`;


// POST
export const PostVerifier = `${BaseURL}/verifiers/`;
export const PostLogin = `${BaseURL}/verifiers/login`;
export const PostTrustedIssuers = `${BaseURL}/verifiers/issuer`;


// PUT
export const PutVerifierById = `${BaseURL}/verifiers/update?id=`;

