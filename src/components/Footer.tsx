export const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#29353c' }}>
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-[#aac7d8] mb-4">
            © 2024 Vihaan Dutta. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-[#768a96]">
            <span>Built with React & TypeScript</span>
            <span>•</span>
            <span>Deployed on GitHub Pages</span>
          </div>
        </div>
      </div>
    </footer>
  );
}; 