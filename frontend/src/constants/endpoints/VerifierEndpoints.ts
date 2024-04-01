import { BaseURL } from "./BaseURL";


// GET
export const GetVerifierById = `${BaseURL}/verifiers/id?id=`;
export const GetVerifierByWalletId = `${BaseURL}/verifiers/wallet?id=`;
export const GetQrScanResult =`${BaseURL}/verifiers/result?`;


// POST
export const PostVerifier = `${BaseURL}/verifiers/`;
export const PostLogin = `${BaseURL}/verifiers/login`;
export const PostTrustedIssuers = `${BaseURL}/verifiers/issuer`;

export const GetIssuersByPublicDid = `${BaseURL}/issuers/trusted`;
export const GetIssuersByType=`${BaseURL}/issuers/type?type=`


// PUT
export const PutVerifierById = `${BaseURL}/verifiers/update?id=`;

