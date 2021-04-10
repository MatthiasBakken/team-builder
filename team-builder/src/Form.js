import React, { useState } from 'react';

import { Formik, Field, Form } from 'formik';
import { hasEmail, hasAlpha, hasSpecialChar, hasMinLength, validationSchema } from './validate';

const initialTeamMembers = [
  {
    name: 'John S',
    email: 'john.s@gmail.com',
    role: 'student',
  },
  {
    name: 'Mary M',
    email: 'mary.m@gmail.com',
    role: 'student',
  },
  {
    name: 'Frank A',
    email: 'frank.a@gmail.com',
    role: 'student',
  },
  {
    name: 'Tim T',
    email: 'tim.t@gmail.com',
    role: 'student',
  },
]

const TeamForm = () => {

    const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

    const buttonValidationHandler = (values) => {
        const name = values.name;
        const email = values.email;
        const role = values.role;
        const validateAlphaInName = hasAlpha(name);
        const validateNoSpecialInName = !hasSpecialChar(name);
        const validateNameMinLen = hasMinLength(name);
        const validateEmail = hasEmail(email);
        const validateAlphaInRole = hasAlpha(role);
        const validateNoSpecialInRole = !hasSpecialChar(role);
        const validateHasMinLen = hasMinLength(role);

        return validateAlphaInName && validateNoSpecialInName && validateNameMinLen && validateEmail && validateAlphaInRole && validateNoSpecialInRole && validateHasMinLen
    }

    return (
        <div className="container" >
            <h3>Add a Team Member</h3>
            <Formik
                initialValues={{ name: "", email: "", role: "" }}
                validateOnChange={true}
                validateOnBlur={false}
                validationSchema={validationSchema}
                onSubmit={values => {
                  const canSubmit = values.name === teamMembers[ teamMembers.length - 1 ].name;
                  if ( !canSubmit ) {
                    setTeamMembers( [ ...teamMembers, values ] );
                  }
                }}
            >
            {({ errors, touched, values}) => (
                <Form>
                    <Field name="name" placeholder="Name" />
                    {errors.name && touched.name ? (
                        <div>{errors.name}</div>
                    ): null}
                    <Field name="email" placeholder="Email" />
                    {errors.email && touched.email ? (
                        <div>{errors.email}</div>
                    ): null}
                    <Field name="role" placeholder="Role" />
                    {errors.role && touched.role ? (
                        <div>{errors.role}</div>
                    ): null}
                    <button disabled={!buttonValidationHandler(values)} type="submit" >Add Member</button>
                </Form>
            )}
            </Formik>
            <div>
                <h3>Team Members:</h3>
                {teamMembers.map((teamMember, i) => {
                    return (
                        <div key={i} className="member-card">
                            <p>Name: {teamMember.name}</p>
                            <p>Email: {teamMember.email}</p>
                            <p>Role: {teamMember.role}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TeamForm;