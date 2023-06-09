import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import axios from '~/api/axios'
import PasswordInput from '~/components/Inputs/PasswordInput'
import TextInput from '~/components/Inputs/TextInput'
import { IFormValues } from '~/types/Form'
import AuthContainer from '../AuthContainers/AuthContainer'
import AuthInnerContainer from '../AuthContainers/AuthInnerContainer'
import {
  FormTitle,
  FormWrapper,
  HaveAccountMessage,
  StyledFormControl,
} from './StyledRegister'

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormValues>()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(
    'Whoops.. Something went wrong'
  )

  const onSubmit: SubmitHandler<IFormValues> = async (formData) => {
    try {
      const promise = axios.post('/auth/register', {
        ...formData,
        name: formData.firstName,
      })

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'User has been created \nRedirecting...',
        error: errorMessage,
      })

      const { data: res }: any = await promise

      if (res.token) {
        window.localStorage.setItem('token', res.token)

        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }

      reset()
    } catch (error: any) {
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <AuthContainer>
      <Toaster />
      <AuthInnerContainer>
        <StyledFormControl>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormTitle variant="h2">Register</FormTitle>
            <Grid container justifyContent="center">
              <AccountCircleRoundedIcon
                color="action"
                sx={{
                  marginTop: 4,
                  transform: 'scale(2.5)',
                }}
              />
            </Grid>

            <FormWrapper>
              <Box>
                <TextInput
                  label="First name"
                  register={register}
                  registerName="firstName"
                  error={!!errors.firstName}
                  errorMessage={errors.firstName?.message || ''}
                />
              </Box>
              <Box>
                <TextInput
                  label="Last name"
                  register={register}
                  registerName="lastName"
                  error={!!errors.lastName}
                  errorMessage={errors.lastName?.message || ''}
                />
              </Box>
              <Box>
                <TextInput
                  label="Email"
                  register={register}
                  registerName="email"
                  error={!!errors.email}
                  errorMessage={errors.email?.message || ''}
                />
              </Box>
              <Box position="relative">
                <PasswordInput
                  label="Password"
                  register={register}
                  registerName="password"
                  error={!!errors.password}
                  errorMessage={errors.password?.message || ''}
                />
              </Box>
            </FormWrapper>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 3 }}
            >
              Register
            </Button>
            <HaveAccountMessage>
              <Typography display="inline" fontSize="smallMessage">
                Already have an account?{' '}
              </Typography>
              <Link to="/login" className="sign-in-link">
                Sign in
              </Link>
            </HaveAccountMessage>
          </form>
        </StyledFormControl>
      </AuthInnerContainer>
    </AuthContainer>
  )
}
