
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-lg overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export const CardHeader: React.FC<CardHeaderProps> = ({ children, className, ...props }) => {
  return <div className={`p-6 border-b border-gray-700 ${className}`} {...props}>{children}</div>;
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export const CardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => {
  return <div className={`${className}`} {...props}>{children}</div>;
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export const CardFooter: React.FC<CardFooterProps> = ({ children, className, ...props }) => {
    return <div className={`p-6 border-t border-gray-700 ${className}`} {...props}>{children}</div>
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}
export const CardTitle: React.FC<CardTitleProps> = ({ children, className, ...props }) => {
  return <h3 className={`text-xl font-semibold text-white ${className}`} {...props}>{children}</h3>;
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    children: React.ReactNode;
}
export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className, ...props }) => {
  return <p className={`text-sm text-gray-400 ${className}`} {...props}>{children}</p>;
};
