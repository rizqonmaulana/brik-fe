import React from 'react';

const Footer: React.FC= () => {
  return (
    <footer className="bg-green-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Klontong Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
