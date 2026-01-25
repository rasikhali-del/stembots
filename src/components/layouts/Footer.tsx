import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold gradient-text mb-4">Stembots</h3>
            <p className="text-sm text-muted-foreground">
              Empowering young minds through innovative STEM education programs.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Follow us on Instagram: <a href="https://instagram.com/stem.bots" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@stem.bots</a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Stembots. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
