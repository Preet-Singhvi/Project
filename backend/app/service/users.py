
from sqlalchemy.future import select
from app.model import Users, Person
from app.config import db

class UserService:

    @staticmethod
    async def get_user_profile(email:str):
        print("Email : " , email)
        query = select(
                        Person.email, 
                        Person.firstname, 
                        Person.lastname,
                        Users.password).join_from(Users,Person).where(Person.email == email)
        return(await db.execute(query)).mappings().one()
                               