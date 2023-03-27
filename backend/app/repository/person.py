from app.model.person import Person
from app.repository.base_repo import BaseRepo
from app.config import db, commit_rollback
from sqlalchemy.future import select
class PersonRepository(BaseRepo):
    model = Person

    @staticmethod
    async def find_by_email(email: str):
        query = select(Person).where(Person.email == email)
        return (await db.execute(query)).scalar_one_or_none()