
const Review = () => {
    const reviews = [
        {
            id: 1,
            name: 'Samantha D.',
            emoji: '🌟',
            comment:
                '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."',
            date: 'Posted on August 14, 2023',
            rating: 5,
        },
        {
            id: 2,
            name: 'Alex M.',
            emoji: '🎨',
            comment:
                '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."',
            date: 'Posted on August 18, 2023',
            rating: 5,
        },
        {
            id: 3,
            name: 'Ethan R.',
            emoji: '🎨',
            comment:
                '"This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of this shirt."',
            date: 'Posted on August 16, 2023',
            rating: 5,
        },
        {
            id: 4,
            name: 'Olivia P.',
            emoji: '🎨',
            comment:
                '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into making this t-shirt stand out."',
            date: 'Posted on August 17, 2023',
            rating: 5,
        },
        {
            id: 5,
            name: 'Liam K.',
            emoji: '🎨',
            comment:
                '"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer\'s skill. It\'s like wearing a piece of art that reflects my passion for both design and fashion."',
            date: 'Posted on August 18, 2023',
            rating: 5,
        },
        {
            id: 6,
            name: 'Ava H.',
            emoji: '🎨',
            comment:
                '"I\'m not just wearing a t-shirt; I\'m wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."',
            date: 'Posted on August 19, 2023',
            rating: 5,
        },
    ];

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>All Reviews (45)</h1>

            <div style={styles.grid}>
                {reviews.map((review) => (
                    <div key={review.id} style={styles.card}>
                        <div style={styles.cardContent}>
                            <h2 style={styles.name}>
                                {review.name} {review.emoji}
                            </h2>
                            <p style={styles.comment}>{review.comment}</p>
                            <p style={styles.date}>{review.date}</p>
                            <div style={styles.stars}>
                                {'⭐'.repeat(review.rating)}
                                {'★'.repeat(5 - review.rating)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.loadMoreContainer}>
                <button style={styles.loadMoreBtn}>Load More Reviews</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#ffffff',
    },
    heading: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#1a1a1a',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        marginBottom: '30px',
    },
    card: {
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e8e8e8',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    name: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#1a1a1a',
        margin: 0,
    },
    comment: {
        fontSize: '15px',
        lineHeight: '1.6',
        color: '#333',
        margin: '5px 0',
        fontStyle: 'italic',
    },
    date: {
        fontSize: '14px',
        color: '#888',
        margin: '5px 0',
    },
    stars: {
        fontSize: '18px',
        color: '#f5a623',
        letterSpacing: '2px',
        marginTop: '5px',
    },
    loadMoreContainer: {
        textAlign: 'center',
        marginTop: '20px',
    },
    loadMoreBtn: {
        padding: '12px 40px',
        fontSize: '16px',
        fontWeight: '500',
        color: '#1a1a1a',
        border: '1px solid #d0d0d0',
        borderRadius: '30px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
};

// Hover effects (using CSS)
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }
  .loadMoreBtn:hover {
    background-color: #e0e0e0;
    border-color: #999;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr !important;
    }
    
    .heading {
      font-size: 24px !important;
    }
    
    .card {
      padding: 18px !important;
    }
    
    .name {
      font-size: 16px !important;
    }
    
    .comment {
      font-size: 14px !important;
    }
    
    .loadMoreBtn {
      padding: 10px 30px !important;
      font-size: 14px !important;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 20px 12px !important;
    }
    
    .heading {
      font-size: 20px !important;
      margin-bottom: 20px !important;
    }
    
    .grid {
      gap: 14px !important;
    }
    
    .card {
      padding: 14px !important;
    }
    
    .name {
      font-size: 15px !important;
    }
    
    .comment {
      font-size: 13px !important;
    }
    
    .date {
      font-size: 12px !important;
    }
    
    .stars {
      font-size: 15px !important;
    }
    
    .loadMoreBtn {
      padding: 8px 24px !important;
      font-size: 13px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Review;