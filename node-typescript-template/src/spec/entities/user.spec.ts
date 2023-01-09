import * as chai from 'chai'
import { should } from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { DataSource, IsNull, Not } from 'typeorm'
import { Query } from 'typeorm/driver/Query'
import { User } from '../../entities/user'
import { ValidationError } from '../../entities/ValidationError'
import { AppDataSource } from '../../lib/typeorm'

chai.use(chaiAsPromised)

describe('User', function () {
  before(async function () {
    // TODO: initialise the datasource (database connection)
    await AppDataSource.initialize()
  })
    
  beforeEach(async function () {
    // TODO: drop the content of the user table between each it().
    const dropTableQuery = " DROP TABLE IF EXISTS users"
    await AppDataSource.query((dropTableQuery))
  })

  describe('validations', function () {
    it('should create a new User in database', async function () {
    await AppDataSource
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {firstname: "Michel", lastname: "Jacques", email: "aze@gmail.com", passwordHash: "0000"}
    ])
    .execute()
    })
    
    it('should raise error if email is missing', async function () {
      const repo=AppDataSource.getRepository(User)
      const user = new User()
      user.firstname="jacques"
      user.lastname="paul"
      user.passwordHash="0000"

      await chai.expect(repo.save(user)).to.eventually.be.rejected.and.deep.include({
        target: user,
        property: 'email',
        constraints: { isNotEmpty: 'email should not be empty' }
      })
    })

    it('should raise error if email is not unique', async function () {
      const repo=AppDataSource.getRepository(User)
      const user = new User();
      user.firstname = "jacques";
      user.lastname = "paul";
      user.email = "aze@gmail.com";
      user.passwordHash = "0000";
      await repo.save(user);

      const user2 = new User();
      user2.firstname = "Andre";
      user2.lastname = "Michel";
      user2.email = "aze@gmail.com";
      user2.passwordHash = "0000";

      await chai.expect(repo.save(user2)).to.eventually.be.rejected.and.deep.include({
        target  : user2,
        property: 'email',
        constraints: { uniqueInColumn: 'email should not be duplicate' }
      })
    })
  })
})