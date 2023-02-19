import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';
import { CreateLaboratoryDto } from 'src/laboratories/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from 'src/user/dto';
import { AppModule } from '../src/app.module';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService)

    await prisma.cleanDb();
    pactum.request.setBaseUrl("https://localhost:3333")
  });
  afterAll(() => {
    app.close();
  })
  describe("Auth", () => {
    const dto: AuthDto = {
      email: "rodrigo@email.com",
      password: '123'
    }; 
    describe("Signup", () => {
      it('should throw exception if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email
          })
          .expectStatus(400)
          .inspect()
      })
      it("should signup", () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect()
      });
    });
    describe("Signin", () => {
      it("should throw if email empty", () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email
          })
          .expectStatus(400)
      })
      it("should signin", () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'acess_token')
      })
    })
  });
  describe("User", () => {
    describe("Get me", () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
      })
    });
    describe("Edit user", () => {
      it("should edit user", () => {
        const dto: EditUserDto = {
          firstName: "rodrigo",
          email: "rod@email.com"
        }

        return pactum
        .spec()
        .patch('/auth/signin')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .withBody(dto)
        .expectStatus(200)
        .expectBodyContains(dto.email)
      })
    });
  });
  describe("Laboratory", () => {
    describe("Get empty laboratory", () => {
      it('should get laboratories', () => {
        return pactum
          .spec()
          .get('/laboaratory')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectBody([])
      })
    })
    describe("Get laboratories", () => {
      it('should get laboratories', () => {
        return pactum
          .spec()
          .get('/laboaratory')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .expectStatus(200)
          .expectJsonLength(1)
      });
    });
    describe("Get laboratory by id", () => {});
    describe("Create Laboratory", () => {
      const dto: CreateLaboratoryDto = {
        name: "teste",
        email: "rodrigo@email.com",
        address: "adasdsadsa",
        phone_1: "12345678",
        phone_2: "",
        site: ""
      } 
      it('should create laboratory', () => {
        return pactum
          .spec()
          .post('/laboaratory')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}'
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('laboratoryId', 'id')
      });
    });
    describe("Edit laboratory by id", () => {});
    describe("Delete laboratory by id", () => {});
  });
  describe("Exam", () => {
    describe("Get Exams", () => {});
    describe("Get exam by id", () => {});
    describe("Create Exam", () => {});
    describe("Edit exam by id", () => {});
    describe("Delete exam by id", () => {});
  });
});
