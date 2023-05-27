import {
  Grid,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { ContactDetails, ContactForm, PageContainer } from '../components';
import { useAnsweredQuestionsQuery } from '../queries/useAnsweredQuestionsQuery';
import { formatDate } from '../utils';

export function ContactPage() {
  const { data: answeredQuestions } = useAnsweredQuestionsQuery();

  return (
    <PageContainer pageTitle='Întreabă Parlamentul'>
      <Typography fontWeight='bold' py={6} variant='h4'>
        Opțiuni de contactare a Parlamentului sau a deputaților
      </Typography>
      <Grid borderRadius={2} boxShadow={3} container mb={12}>
        <ContactDetails />

        <ContactForm />
      </Grid>

      <Typography fontWeight='bold' variant='h4'>
        Întrebări și răspunsuri recepționate:
      </Typography>

      <List>
        {answeredQuestions?.map((answeredQuestion) => (
          <ListItem key={answeredQuestion.id} divider>
            <ListItemText
              primary={
                <Typography
                  color='#780000'
                  component={MuiLink}
                  fontSize={16}
                  fontWeight='medium'
                  href={answeredQuestion.answerFile}
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: 'primary.main',
                    },
                  }}
                  target='_blank'
                >
                  {answeredQuestion.question}
                </Typography>
              }
              secondary={
                <Stack mt={2}>
                  <Typography>
                    Întrebare adresată către:{' '}
                    <strong>{answeredQuestion.questionFor}</strong>, la data de{' '}
                    {formatDate(answeredQuestion.askedAt)}
                  </Typography>
                  {answeredQuestion.answerFile ? (
                    <Typography>
                      <Typography
                        color='#780000'
                        component={MuiLink}
                        href={answeredQuestion.answerFile}
                        fontWeight={700}
                        sx={{
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                            color: 'primary.main',
                          },
                        }}
                        target='_blank'
                      >
                        Vezi răspunsul
                      </Typography>{' '}
                      primit la data de {formatDate(answeredQuestion.answerAt)}
                    </Typography>
                  ) : (
                    <Typography>
                      Nu există un răspuns la această întrebare
                    </Typography>
                  )}
                </Stack>
              }
            />
          </ListItem>
        ))}
      </List>
    </PageContainer>
  );
}
