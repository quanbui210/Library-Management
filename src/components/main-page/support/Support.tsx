import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import './Support.scss'
import libImg from '../../../assets/lib-img.png'

export default function Support() {
  const faqs = [
    {
      question: 'How do I borrow a book?',
      answer:
        'To borrow a book, log in to your account and navigate to the "Books" section. Find the book you want to borrow and click on the "Borrow" button. The book will be added to your borrowed items.'
    },
    {
      question: 'What is the due date for borrowed books?',
      answer:
        'The due date for borrowed books is typically 14 days from the date of borrowing. Please make sure to return the book on or before the due date to avoid any fines.'
    },
    {
      question: 'How do I return a book?',
      answer:
        'To return a book, go to the "Checkouts" section and select the "Borrowed Books" tab. Find the book you want to return and click on the "Return" button. Follow the instructions to complete the return process.'
    },
    {
      question: 'Can I renew the borrowed books?',
      answer:
        'Yes, in most cases, you can renew your borrowed books if they are not on hold for another user. To renew a book, go to the "My Account" section and select the "Borrowed Books" tab. Find the book you want to renew and click on the "Renew" button.'
    },
    {
      question: 'What happens if I return a book late?',
      answer:
        'If you return a book late, you may be subject to fines. The fine amount and duration vary depending on the library policy. It is recommended to return books on time to avoid any penalties.'
    },
    {
      question: 'How can I pay fines for late returns?',
      answer:
        'To pay fines for late returns, go to the "My Account" section and select the "Fines and Payments" tab. Follow the instructions to make the payment using the available payment methods.'
    }
  ]

  const getCardColorClass = (index: number) => {
    const colors = ['blue', 'green', 'purple', 'orange', 'pink', 'teal'] // Add more colors as needed
    return colors[index % colors.length]
  }
  return (
    <div className="support-container">
      <h1>Library Support and FAQs</h1>
      <h4 style={{ textAlign: 'center' }}>
        <i>
          Discover Our Library, Uncover Our Story, and Get Support from Our Customer Service Team!
        </i>
      </h4>
      <section className="lib-intro">
        <h2>Library Introduction</h2>
        <img className="lib-img" src={libImg} alt="" />
        <p>
          Welcome to our library! We strive to provide a rich collection of books and resources to
          cater to the diverse interests of our readers. Whether you are a student, a book
          enthusiast, or someone seeking knowledge, our library is the perfect place for you.
        </p>
        <p>
          Our library features a wide range of genres, including fiction, non-fiction, biographies,
          self-help, academic resources, and much more. With a dedicated team of librarians and
          staff, we aim to create a comfortable and conducive environment for your reading and
          learning experience.
        </p>
        <p>
          Browse through our extensive collection, borrow your favorite books, and embark on a
          literary journey. If you have any questions or need assistance, our support team is always
          ready to help. Check out the FAQs section below for answers to common queries, or feel
          free to reach out to us directly.
        </p>
      </section>
      <section>
        <h2>Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className={`FAQ-card ${getCardColorClass(index)}`}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className={`FAQ-card-title ${getCardColorClass(index)}`}>
                <h3>{faq.question}</h3>
              </AccordionSummary>
              <AccordionDetails>
                <h5>
                  <i>{faq.answer}</i>
                </h5>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
        <div className="FAQ-card">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="contact-info-content"
              id="contact-info-header"
              style={{ color: '#1c6bea' }}>
              <h3>Contact Information</h3>
            </AccordionSummary>
            <AccordionDetails>
              <div className="contact-info">
                <h5>
                  If you have any questions or need assistance, please feel free to reach out to our
                  support team.
                </h5>
                <ul>
                  <li>
                    <strong>Contact Person:</strong> John Doe
                  </li>
                  <li>
                    <strong>Email:</strong> support@example.com
                  </li>
                  <li>
                    <strong>Phone:</strong> +1 123-456-7890
                  </li>
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="FAQ-card">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="opening-hours-content"
              id="opening-hours-header"
              style={{ color: '#26a267' }}>
              <h3>Opening Hours</h3>
            </AccordionSummary>
            <AccordionDetails>
              <div className="opening-hours">
                <h5>Our library operates during the following hours:</h5>
                <ul>
                  <li>Monday to Friday: 9:00 AM - 6:00 PM</li>
                  <li>Saturday: 10:00 AM - 4:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </section>
    </div>
  )
}
