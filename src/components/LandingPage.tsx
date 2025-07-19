import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Map, 
  Users, 
  Trophy, 
  Search, 
  MapPin, 
  Star,
  ArrowRight,
  Play,
  Target
} from 'lucide-react';
import Button from './common/Button';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Map className="h-8 w-8 text-gaming-purple-400" />,
      title: "Cartes Interactives",
      description: "Explorez les emplacements de trésors avec des cartes interactives détaillées et des coordonnées précises."
    },
    {
      icon: <Search className="h-8 w-8 text-gaming-purple-400" />,
      title: "Indices Stimulants",
      description: "Résolvez des énigmes, décodez des messages et suivez les indices pour découvrir des trésors cachés."
    },
    {
      icon: <Users className="h-8 w-8 text-gaming-purple-400" />,
      title: "Rejoignez les Aventures",
      description: "Faites équipe avec d'autres chasseurs de trésors ou embarquez dans des quêtes en solo à travers le globe."
    },
    {
      icon: <Trophy className="h-8 w-8 text-gaming-purple-400" />,
      title: "Gagnez des Récompenses",
      description: "Terminez des chasses pour débloquer des succès et gravir les classements des chasseurs de trésors."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Passionnée d'Aventure",
      content: "L'expérience de chasse au trésor la plus excitante que j'aie jamais vécue ! Les indices sont stimulants et la communauté est formidable.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Explorateur",
      content: "J'ai trouvé 12 trésors jusqu'à présent ! Chaque chasse est unique et vous emmène dans des endroits incroyables que vous ne découvririez jamais autrement.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Résolveur d'Énigmes",
      content: "Mélange parfait de technologie et d'aventure. Les cartes interactives et les énigmes astucieuses me font revenir sans cesse.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gaming-dark-900">
      {/* Navigation */}
      <nav className="bg-gaming-dark-900 border-b border-gaming-dark-700 shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Compass className="text-gaming-purple-400 h-8 w-8" />
              <span className="text-white font-display text-xl tracking-wider">
                Lootopia
              </span>
            </div>
            <Link to="/signin">
              <Button variant="outline" className="text-gaming-purple-400 border-gaming-purple-600 hover:bg-gaming-purple-600 hover:text-white">
                Se Connecter
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-gaming py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-5"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-purple rounded-full mb-8 shadow-2xl shadow-gaming-purple-500/50 animate-glow">
              <Compass className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Découvrez des
              <span className="text-gaming-purple-400 block animate-pulse-slow">Trésors Cachés</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Embarquez dans des aventures épiques de chasse au trésor à travers le monde. Résolvez des indices mystérieux, 
              explorez des lieux incroyables et découvrez des trésors légendaires qui attendent d'être trouvés.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signin">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold"
                  icon={<Play size={20} />}
                >
                  Commencez Votre Aventure
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg"
                icon={<Target size={20} />}
              >
                Explorer les Trésors
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gaming-dark-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2 p-6 bg-gaming-dark-700 rounded-xl border border-gaming-dark-600 hover:border-gaming-purple-600 transition-colors">
              <div className="text-4xl font-bold text-gaming-purple-400">500+</div>
              <div className="text-gray-400">Trésors Actifs</div>
            </div>
            <div className="space-y-2 p-6 bg-gaming-dark-700 rounded-xl border border-gaming-dark-600 hover:border-gaming-purple-600 transition-colors">
              <div className="text-4xl font-bold text-gaming-purple-400">10K+</div>
              <div className="text-gray-400">Chasseurs de Trésors</div>
            </div>
            <div className="space-y-2 p-6 bg-gaming-dark-700 rounded-xl border border-gaming-dark-600 hover:border-gaming-purple-600 transition-colors">
              <div className="text-4xl font-bold text-gaming-purple-400">50+</div>
              <div className="text-gray-400">Pays</div>
            </div>
            <div className="space-y-2 p-6 bg-gaming-dark-700 rounded-xl border border-gaming-dark-600 hover:border-gaming-purple-600 transition-colors">
              <div className="text-4xl font-bold text-gaming-purple-400">2.5K+</div>
              <div className="text-gray-400">Trésors Trouvés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gaming-dark-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Pourquoi Choisir Notre Plateforme ?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Nous avons construit l'expérience ultime de chasse au trésor avec une technologie de pointe 
              et une communauté passionnée d'aventuriers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gaming-dark-800 rounded-xl p-8 border border-gaming-dark-600 hover:border-gaming-purple-600 
                          hover:shadow-lg hover:shadow-gaming-purple-500/10 transition-all text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gaming-dark-700 rounded-full mb-6 
                              group-hover:bg-gaming-purple-900/50 group-hover:scale-110 transition-all border border-gaming-dark-600 
                              group-hover:border-gaming-purple-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-gaming-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gaming-dark-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Comment Ça Marche
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Commencer est simple. Suivez ces étapes pour débuter votre voyage de chasse au trésor.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-purple text-white rounded-full text-2xl font-bold mb-6 shadow-lg shadow-gaming-purple-500/25">
                1
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Inscrivez-vous & Explorez</h3>
              <p className="text-gray-400 leading-relaxed">
                Créez votre compte et parcourez des centaines de chasses au trésor disponibles à différents niveaux de difficulté.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-purple text-white rounded-full text-2xl font-bold mb-6 shadow-lg shadow-gaming-purple-500/25">
                2
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Rejoignez & Résolvez</h3>
              <p className="text-gray-400 leading-relaxed">
                Rejoignez les chasses au trésor qui vous intéressent, résolvez des indices stimulants et suivez la piste avec nos cartes interactives.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-purple text-white rounded-full text-2xl font-bold mb-6 shadow-lg shadow-gaming-purple-500/25">
                3
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Découvrez & Gagnez</h3>
              <p className="text-gray-400 leading-relaxed">
                Trouvez le trésor, revendiquez votre victoire et gagnez des récompenses tout en construisant votre réputation de maître chasseur de trésors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-gaming text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Ce Que Disent les Aventuriers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Rejoignez des milliers de chasseurs de trésors satisfaits qui ont découvert des aventures incroyables.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gaming-dark-800/50 backdrop-blur-sm rounded-xl p-8 border border-gaming-dark-600 
                          hover:border-gaming-purple-600 hover:shadow-lg hover:shadow-gaming-purple-500/10 transition-all"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gaming-purple-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-gaming-purple-300 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gaming-dark-800">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Prêt à Commencer Votre Quête ?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté de chasseurs de trésors dès aujourd'hui et embarquez dans des aventures inoubliables 
              qui vous emmèneront dans les endroits les plus incroyables de la Terre.
            </p>
            
            <Link to="/signin">
              <Button 
                variant="primary" 
                size="lg"
                className="px-12 py-4 text-xl font-semibold"
                icon={<ArrowRight size={24} />}
                iconPosition="right"
              >
                Commencez Votre Aventure
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gaming-dark-900 text-gray-300 py-12 border-t border-gaming-dark-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Compass className="text-gaming-purple-400 h-8 w-8" />
                <span className="font-display text-2xl tracking-wider text-white">
                  Chasse au Trésor
                </span>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                La plateforme de chasse au trésor de référence mondiale. Découvrez des trésors cachés, 
                résolvez des énigmes stimulantes et rejoignez une communauté mondiale d'aventuriers.
              </p>
            </div>
            
            <div>
              <h3 className="font-display text-gaming-purple-400 text-lg mb-4">Plateforme</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-gaming-purple-300 transition-colors">Comment Ça Marche</a></li>
                <li><a href="#" className="hover:text-gaming-purple-300 transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-gaming-purple-300 transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-gaming-purple-300 transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-display text-gaming-purple-400 text-lg mb-4">Communauté</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-gaming-purple-300 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-gaming-purple-300 transition-colors">Forums</a></li>
                <li><a href="#" className="hover:text-gaming-purple-300 transition-colors">Événements</a></li>
                <li><a href="#" className="hover:text-gaming-purple-300 transition-colors">Classement</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gaming-dark-700 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Aventure Chasse au Trésor. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;