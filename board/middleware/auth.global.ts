const publickRoutes = ['/', '/account/signin', '/account/signup', '/account/check-email', '/account/forgot-password'];

export default defineNuxtRouteMiddleware((to, from) => {
  if (publickRoutes.includes(to.path)) {
    return;
  }

  const user = useState('user');
  const messages = useMessages();
  if (!user.value) {
    messages.value.push({
      text: 'You need to sign in to access this page.',
      color: 'error',
    });
    return navigateTo('/account/signin');
  }
});
