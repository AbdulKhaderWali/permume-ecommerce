const Footer = () => {
  return (
    <footer className="bg-black text-white p-4 mt-8">
      <div className="container mx-auto text-center font-serif">
        <p>&copy; {new Date().getFullYear()} Elysian Perfumes. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
