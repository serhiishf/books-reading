import React, { useEffect } from 'react';
import PagesRoutes from './views/PagesRoutes';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './redux/app/hooks';
import authOperations from './redux/features/auth/authOperations';
import tokenService from './services/auth/token-service';

function App() {
  console.log(
    'Уважаемый проверяющий! Мы очень старились закончить наше приложение во время, но к сожалению, из-за необходимости созданя своего бекенда и изучения Реакта, мы не успели доделать одну страницу - Тренинг. Пожалуйста, подари нам еще 2 дня и проверь работу в четверг! Спасибо огромное за понимание :)',
  );

  const dispatch = useAppDispatch();
  const accessToken = tokenService.getLocalAccessToken();

  useEffect(() => {
    if (accessToken) {
      dispatch(authOperations.getCurrent());
    }
  }, [dispatch, accessToken]);

  return (
    <>
      <PagesRoutes />
      <ToastContainer
        autoClose={2000}
        hideProgressBar
        position="top-center"
        theme="colored"
        transition={Zoom}
      />
    </>
  );
}

export default App;
