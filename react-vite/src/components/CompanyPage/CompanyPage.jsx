import "./CompanyPage.css";

export default function CompanyPage() {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Carissa Bays",
      role: "CEO & Founder",
      bio: "Carissa has a passion for photography and technology, bringing her vision to life through Shutr's innovative platform.",
      image: "https://picsum.photos/id/1027/300/300"
    },
    {
      id: 2,
      name: "Tristan Keas",
      role: "CTO & Co-Founder",
      bio: "Tristan brings extensive experience in building scalable platforms and is an avid landscape photographer.",
      image: "https://picsum.photos/id/1025/300/300"
    },
    {
      id: 3,
      name: "Stephen Campion",
      role: "Head of Product",
      bio: "Stephen leads our product team with a focus on creating intuitive and powerful tools for photographers.",
      image: "https://picsum.photos/id/1062/300/300"
    },
    {
      id: 4,
      name: "Dmitri Menas",
      role: "Head of Community",
      bio: "Dmitri is dedicated to fostering a vibrant and supportive community of photographers on Shutr.",
      image: "https://picsum.photos/id/1074/300/300"
    },
    {
      id: 5,
      name: "Ed Sheeran",
      role: "Chief Hearthrob Officer",
      bio: "Ed joined Shutr to capture perfect shots, but mostly captures hearts. Our instructor can't stop talking about him, and we can't blame him either.",
      image: "/dreamstimewatermarked_87836996.jpg"
    }
  ];

  // Sample press releases
  const pressReleases = [
    {
      id: 1,
      title: "Shutr Reaches 10 Million Users Worldwide",
      date: "March 15, 2025",
      excerpt: "Shutr announced today that it has reached 10 million users globally, marking a significant milestone for the photography platform."
    },
    {
      id: 2,
      title: "Shutr Launches New Pro Features for Photographers",
      date: "February 2, 2025",
      excerpt: "Today, Shutr unveiled a suite of new professional features designed to help photographers showcase and monetize their work."
    },
    {
      id: 3,
      title: "Shutr Partners with Leading Camera Manufacturers",
      date: "January 10, 2025",
      excerpt: "Shutr announced strategic partnerships with several leading camera manufacturers to enhance the platform's integration capabilities."
    }
  ];

  return (
    <div className="company-page">
      {/* Hero section */}
      <section className="company-hero">
        <div className="company-hero__content">
          <h1>About Shutr</h1>
          <p>Connecting photographers and photography enthusiasts around the world.</p>
        </div>
      </section>

      {/* Mission section */}
      <section className="company-section company-mission">
        <div className="company-section__header">
          <h2>Our Mission</h2>
        </div>
        <div className="company-mission__content">
          <div className="company-mission__text">
            <p>
              At Shutr, we believe in the power of photography to connect people, tell stories, and preserve moments. 
              Our mission is to create the best platform for photographers to share their work, grow their skills, 
              and connect with a global community of like-minded enthusiasts.
            </p>
            <p>
              Founded in 2022, Shutr has grown from a small photo-sharing app to a comprehensive platform serving 
              millions of photographers worldwide. We&apos;re committed to providing innovative tools and a supportive 
              community that helps photographers at every level showcase their creativity and passion.
            </p>
          </div>
          <div className="company-mission__image">
            <img src="https://picsum.photos/id/1057/600/400" alt="Shutr mission" />
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="company-section company-values">
        <div className="company-section__header">
          <h2>Our Values</h2>
        </div>
        <div className="company-values__grid">
          <div className="company-value-card">
            <div className="company-value-card__icon">
              <i className="fa fa-camera"></i>
            </div>
            <h3>Creativity</h3>
            <p>We celebrate creative expression and provide tools that empower photographers to realize their vision.</p>
          </div>
          <div className="company-value-card">
            <div className="company-value-card__icon">
              <i className="fa fa-users"></i>
            </div>
            <h3>Community</h3>
            <p>We foster a supportive, inclusive community where photographers can connect, learn, and grow together.</p>
          </div>
          <div className="company-value-card">
            <div className="company-value-card__icon">
              <i className="fa fa-lightbulb"></i>
            </div>
            <h3>Innovation</h3>
            <p>We continuously innovate to provide cutting-edge tools and features that enhance the photography experience.</p>
          </div>
          <div className="company-value-card">
            <div className="company-value-card__icon">
              <i className="fa fa-lock"></i>
            </div>
            <h3>Trust</h3>
            <p>We respect photographers&apos; rights and are committed to protecting their work and privacy.</p>
          </div>
        </div>
      </section>

      {/* Team section */}
      <section className="company-section company-team">
        <div className="company-section__header">
          <h2>Our Team</h2>
        </div>
        <div className="company-team__grid">
          {teamMembers.map(member => (
            <div key={member.id} className="company-team-card">
              <div className={`company-team-card__image ${member.name === "Ed Sheeran" ? "ed-sheeran-image" : ""}`}>
                <img src={member.image} alt={member.name} />
              </div>
              <div className="company-team-card__content">
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Press section */}
      <section className="company-section company-press">
        <div className="company-section__header">
          <h2>Press & News</h2>
          <a href="#" className="company-section__link">View all press releases</a>
        </div>
        <div className="company-press__list">
          {pressReleases.map(press => (
            <div key={press.id} className="company-press-card">
              <div className="company-press-card__date">{press.date}</div>
              <h3>{press.title}</h3>
              <p>{press.excerpt}</p>
              <a href="#" className="company-press-card__link">Read more</a>
            </div>
          ))}
        </div>
      </section>

      {/* Careers section */}
      <section className="company-section company-careers">
        <div className="company-careers__content">
          <h2>Join Our Team</h2>
          <p>
            We&apos;re always looking for talented individuals who are passionate about photography and technology. 
            Check out our open positions and become part of the Shutr family.
          </p>
          <button className="form-button">View Open Positions</button>
        </div>
      </section>

      {/* Contact section */}
      <section className="company-section company-contact">
        <div className="company-section__header">
          <h2>Contact Us</h2>
        </div>
        <div className="company-contact__content">
          <div className="company-contact__info">
            <div className="company-contact__item">
              <h3>General Inquiries</h3>
              <p>info@shutr.com</p>
            </div>
            <div className="company-contact__item">
              <h3>Press</h3>
              <p>press@shutr.com</p>
            </div>
            <div className="company-contact__item">
              <h3>Careers</h3>
              <p>careers@shutr.com</p>
            </div>
            <div className="company-contact__item">
              <h3>Support</h3>
              <p>support@shutr.com</p>
            </div>
          </div>
          <div className="company-contact__social">
            <h3>Follow Us</h3>
            <div className="company-contact__social-links">
              <a href="#" className="company-contact__social-link">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#" className="company-contact__social-link">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#" className="company-contact__social-link">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#" className="company-contact__social-link">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}