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

    const departureCoordinates = await prisma.coordinates.create({
      data: {
        longitude: flight.departure.lon.toString(),
        latitute: flight.departure.lat.toString(),
      },
    });

    const arrivalCoordinates = await prisma.coordinates.create({
      data: {
        longitude: flight.arrival.lon.toString(),
        latitute: flight.arrival.lat.toString(),
      },
    });

    const quote = await prisma.quote.create({
      data: {
        departure: {
          create: {
            airportName: flight.departure.name,
            cityName: flight.departure.city,
            country: flight.departure.country,
            IATACode: flight.departure.iata,
            ICAOCode: flight.departure.icao,
            coordinates: {
              connectOrCreate: {
                create: {
                  latitute: flight.departure.lat.toString(),
                  longitude: flight.departure.lon.toString(),
                },

                where: {
                  id: departureCoordinates.id,
                },
              },
            },
          },
        },
        destination: {
          create: {
            airportName: flight.arrival.name,
            cityName: flight.arrival.city,
            country: flight.arrival.country,
            IATACode: flight.arrival.iata,
            ICAOCode: flight.arrival.icao,
            coordinates: {
              connectOrCreate: {
                create: {
                  latitute: flight.departure.lat.toString(),
                  longitude: flight.departure.lon.toString(),
                },

                where: {
                  id: arrivalCoordinates.id,
                },
              },
            },
          },
        },

        departureDate: faker.date.soon().toISOString(),
        returnDate: faker.date.future().toISOString(),
        numberOfTravellers: faker.datatype.number({ min: 2, max: 250 }),

        contact: {
          create: [
            {
              phoneNumber: faker.phone.phoneNumber(),
              email: faker.internet.email(),
            },
          ],
        },
        transportation: {
          create: [
            {
              type: faker.vehicle.type(),
              availableOnSite: faker.datatype.boolean(),
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
