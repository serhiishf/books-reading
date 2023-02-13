import React, { useEffect, useState } from 'react';
import LoginForm from '../../components/LoginForm';
import styles from './LoginPage.module.scss';
import getRandomNum from '../../services/getRandomNum';
import quotes from '../../data/quotes';

export interface QuoteI {
  text: string;
  author: string;
}

export default function LoginPage() {
  const [allQuotes, setQuotes] = useState(quotes);
  const [quote, setQuote] = useState({
    text: '',
    author: '',
  });
  const getQuote = () => {
    const quoteNum = getRandomNum();
    const randomQuote = {
      text: allQuotes[quoteNum]?.text,
      author: allQuotes[quoteNum]?.author,
    };
    return randomQuote;
  };

  useEffect(() => {
    setQuote(getQuote());
  }, []);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.leftSide}>
        <LoginForm />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.quoteSign}>&ldquo;</div>
        <p className={styles.quoteText}>{quote.text}</p>
        <p className={styles.quoteAuthor}>{quote.author}</p>
      </div>
    </div>
  );
}
