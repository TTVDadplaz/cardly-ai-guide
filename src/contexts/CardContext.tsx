
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Card {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  bio: string;
  views: number;
  shares: number;
  createdAt: Date;
}

interface CardContextType {
  cards: Card[];
  addCard: (card: Omit<Card, 'id' | 'views' | 'shares' | 'createdAt'>) => void;
  updateCard: (id: string, card: Partial<Card>) => void;
  deleteCard: (id: string) => void;
  getCard: (id: string) => Card | undefined;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [cards, setCards] = useState<Card[]>([]);

  const addCard = (cardData: Omit<Card, 'id' | 'views' | 'shares' | 'createdAt'>) => {
    const newCard: Card = {
      ...cardData,
      id: Math.random().toString(36).substr(2, 9),
      views: 0,
      shares: 0,
      createdAt: new Date()
    };
    setCards(prev => [...prev, newCard]);
  };

  const updateCard = (id: string, updatedData: Partial<Card>) => {
    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, ...updatedData } : card
    ));
  };

  const deleteCard = (id: string) => {
    setCards(prev => prev.filter(card => card.id !== id));
  };

  const getCard = (id: string) => {
    return cards.find(card => card.id === id);
  };

  return (
    <CardContext.Provider value={{ cards, addCard, updateCard, deleteCard, getCard }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCards must be used within a CardProvider');
  }
  return context;
};
