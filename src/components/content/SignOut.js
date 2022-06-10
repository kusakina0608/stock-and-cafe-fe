import React from 'react';

export default function SignOut() {
  localStorage.clear();
  document.location.href = "/"
};