import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { FlightGenerator } from 'random-flight-generator/lib/FlightGenerator';

const prisma = new PrismaClient();

async function main() {
  let i = 0;

  while (i < 10) {
    const flight = new FlightGenerator({
      minDistance: 5,
    }).generateFlight();

    const quote = await prisma.quote.create({
      data: {
        departureDate: faker.date.soon().toISOString(),
        returnDate: faker.date.future().toISOString(),
        departureLocation: flight.departure.icao,
        departureAirportName: flight.departure.name,
        destinationAirportName: flight.arrival.name,
        destinationLocation: flight.arrival.icao,
        numberOfTravellers: Math.floor(Math.random() * 300),
        contact: {
          create: [{ contactInformation: faker.phone.phoneNumber() }],
        },
        transportationType: {
          create: [
            {
              availableOnSite: Math.random() * 10 > 1 ? true : false,
              type: faker.vehicle.type(),
            },
          ],
        },
      },
    });

    console.log(quote);
    i++;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
