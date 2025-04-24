import z from "zod";

const configSchema = z.strictObject({
	APP_MODE: z.enum(["development", "production"]),
	SESSION_KEY: z.string().min(1),
	APP_SERVER_URL: z.string().min(1),
});
export type Config = z.infer<typeof configSchema>;

export async function validateConfig(config: unknown) {
	const result = await configSchema.safeParseAsync(config);
	if (!result.success) {
		console.log("config", config);
		throw new Error("Invalid configuration");
	}
	return result.data;
}
