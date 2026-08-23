import asyncio
import httpx


async def main() -> None:
    payload = {"agent_name": "AgentForge", "phase": 0}
    headers = {
        "Authorization": "Bearer fake-demo-token-123",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://httpbin.org/post", json=payload, headers=headers
        )
        response.raise_for_status()
        data = response.json()

    print("Server saw this JSON body:", data["json"])
    print("Server saw this Authorization header:", data["headers"]["Authorization"])


if __name__ == "__main__":
    asyncio.run(main())
