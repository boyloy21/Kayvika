"use client"

import { useState } from "react";
import Swal from "sweetalert2";

export default function Alert() {
    const [swalProps, setSwalProps] = useState({});
    const handlerAlertClick = () => {
        Swal.fire({
            header: "Welcome",
            icon: "success",
            title: "Hello world!"
        })
    }
    const handlerConfirmClick = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "success",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else if (result.dismiss === Swal.DismissReason.cancel){
                Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
            }
        })
    }
    const handlerPromptClick = () => {
        Swal.fire({
            title: "Enter your name",
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Save",
            showLoaderOnConfirm: true,
            inputValidator: (value) => {
                if (!value) {
                    return "You need to enter a name!";
                }
            }
            // preConfirm: (login) => {
            //     return fetch(`//api.github.com/users/${login}`)
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error(response.statusText)
            //         }
            //         return response.json()
            //     })
            //     .catch(error => {
            //         Swal.showValidationMessage(`Request failed: ${error}`)
            //     })
            // },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(`Hello ${result.value}!`);
            }
        })
    }
    const handlerSuccessClick = (title) => {
        Swal.fire('Success', `${title}`, 'success');
    }
    const handlerErrorClick = () => {
        Swal.fire('Error', 'Something went wrong', 'error');
    }
    const handlerWarningClick = () => {
        Swal.fire('Warning', 'Something went wrong', 'warning');
    }
    const handlerInfoClick = () => {
        Swal.fire('Info', 'This is an infomative message', 'info');
    }
    const handlerQuestionClick = () => {
        Swal.fire('Question', 'Are you sure', 'question');
    }
    return {
        handlerAlertClick,
        handlerConfirmClick,
        handlerPromptClick,
        handlerSuccessClick,
        handlerErrorClick,
        handlerWarningClick,
        handlerInfoClick,
        handlerQuestionClick
    }; 
};