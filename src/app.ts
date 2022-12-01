import bootstrap from "./server";

const server = bootstrap();

async function main() {
  const PORT = process.env.PORT || 3000
  try {
    await server.listen(PORT, "0.0.0.0");

    console.log(`Server ready at http://localhost:${PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();