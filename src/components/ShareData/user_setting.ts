import { useState } from "react"
import { User } from "linkWithBackend/interfaces/TendonType";

var token = ""
var firstName = ""
var lastName = ""

function getTokenInitialState() {
    var tokenMEM = localStorage.getItem( 'tokenMEM' ) || ""
    return tokenMEM
}

function getUserInitialState() {
    var fName = localStorage.getItem( 'firstName' ) || ""
    var lName = localStorage.getItem( 'lastName' ) || ""
    return {
        firstName: fName,
        lastName: lName
    }
}


function settokenMEM( tokenNew: string) {
    localStorage.setItem( 'tokenMEM', tokenNew )
    token = tokenNew
}

export function setToken(tokenNew: string) {
    token = tokenNew
    settokenMEM(tokenNew)
}

export function getToken() {
    if (typeof window !== 'undefined') {
        token = getTokenInitialState()
        return token
    }
    return token
}

async function SetuserInformation(user: User) {
    firstName = user.firstName
    lastName = user.lastName
    localStorage.setItem( 'firstName', user.firstName)
    localStorage.setItem( 'lastName', user.lastName)
}

export async function userInformation(user: User) {
    await SetuserInformation(user)
}

export function getUserCurrentData() {
    if (typeof window !== 'undefined') {
        return getUserInitialState()
    }
    return {
        firstName: firstName,
        lastName: lastName
    }
}